const requestPromise = require('request-promise-native');

module.exports = {
    getAuthorities: async function (req, res) {
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

        const response = authoritiesParsed.authorities.map(json => {
            return {
                id: json.LocalAuthorityId,
                name: json.Name
            }
        }, authoritiesParsed);

        return res.json(response);
    },

    getAuthority: async function (req, res) {
        const { authorityId } = req.params;

        if (isNaN(authorityId)) {
            return res.status(400).json({ error: 'No valid authority ID was specified' });
        }

        // This is just sample data to demonstrate the contract of the API
        const oneRatingsSample = [
            { name: '5-star', value: 22.41 },
            { name: '4-star', value: 43.13 },
            { name: '3-star', value: 12.97 },
            { name: '2-star', value: 1.54 },
            { name: '1-star', value: 17.84 },
            { name: 'Exempt', value: 2.11 },
        ];

        const anotherRatingsSample = [
            { name: '5-star', value: 50 },
            { name: '4-star', value: 0 },
            { name: '3-star', value: 0 },
            { name: '2-star', value: 0 },
            { name: '1-star', value: 25 },
            { name: 'Exempt', value: 25 },
        ];

        const ratings = (authorityId % 2) === 1
            ? oneRatingsSample
            : anotherRatingsSample;

        return res.json(ratings);
    }
};
