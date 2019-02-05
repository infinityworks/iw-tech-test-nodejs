const requestPromise = require('request-promise-native');
const AuthorityRating = require('../model/authorityRating');

module.exports = (authorityMapper) => {
    async function getAuthorities(req, res) {
        const requestParams = {
            uri: 'http://api.ratings.food.gov.uk/Authorities',
            headers: {
                Accept: 'application/json',
                'x-api-version': '2',
            },
        };

        let authoritiesResponse = null;

        try {
            authoritiesResponse = await requestPromise(requestParams);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Unable to access FSA API' });
        }

        const authoritiesParsed = JSON.parse(authoritiesResponse);
        const authorityModels = authoritiesParsed.authorities.map(authority => authorityMapper.map(authority));

        const response = authorityModels.map(authority => authority.toObject());
        return res.json(response);
    }

    async function getAuthority(req, res) {
        const { authorityId } = req.params;

        if (isNaN(authorityId)) {
            return res.status(400).json({ error: 'No valid authority ID was specified' });
        }

        // This is just sample data to demonstrate the contract of the API
        const oneRatingsSample = [
            new AuthorityRating('5-star', 22.41),
            new AuthorityRating('4-star', 43.13),
            new AuthorityRating('3-star', 12.97),
            new AuthorityRating('2-star', 1.54),
            new AuthorityRating('1-star', 17.84),
            new AuthorityRating('Exempt', 2.11),
        ];

        const anotherRatingsSample = [
            new AuthorityRating('5-star', 50),
            new AuthorityRating('4-star', 0),
            new AuthorityRating('3-star', 0),
            new AuthorityRating('2-star', 0),
            new AuthorityRating('1-star', 25),
            new AuthorityRating('Exempt', 25),
        ];

        const ratings = (authorityId % 2) === 1
            ? oneRatingsSample
            : anotherRatingsSample;

        return res.json(ratings.map(rating => rating.toObject()));
    }

    return {
        getAuthorities,
        getAuthority,
    };
};
