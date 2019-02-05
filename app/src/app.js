const express = require('express');

module.exports = (ratingController) => {
    const DEFAULT_PORT = 8080;
    const app = express();
    init();

    async function run() {
        init();
        app.listen(DEFAULT_PORT, () => {
            console.log(`Server listening on http://localhost:${DEFAULT_PORT} ...`);
        });
    }

    function init() {
        app.use(express.static('public'));

        app.get('/favicon.ico', function(req, res){
            res.status(404).end();
        });

        app.get('/', (req, res) => {
            return res.send();
        });

        app.get('/api', (req, res) => {
            return ratingController.getAuthorities(req, res);
        })

        app.get('/api/:authorityId', (req, res) => {
            return ratingController.getAuthority(req, res);
        });
    }

    return {
        run,
    };
};
