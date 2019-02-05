const requestPromise = require('request-promise-native');

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

    return {
        getAuthorities,
    };
};
