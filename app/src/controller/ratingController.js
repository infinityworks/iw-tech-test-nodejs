const requestPromise = require('request-promise-native');

module.exports = () => {
    async function getAuthorities(req, res) {
        const requestParams = {
            uri: 'http://api.ratings.food.gov.uk/Authorities',
            headers: {
                Accept: 'application/json',
                'x-api-version': '2',
            },
        };

        let response = null;

        try {
            response = await requestPromise(requestParams);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Unable to access FSA API' });
        }

        return res.json(response);
    }

    return {
        getAuthorities,
    };
};
