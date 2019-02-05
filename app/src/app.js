const express = require('express');

module.exports = () => {
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
        app.get('/api', (req, res) => {
            return res.json({ response: 'ok' });
        })
    }

    return {
        run,
    };
};
