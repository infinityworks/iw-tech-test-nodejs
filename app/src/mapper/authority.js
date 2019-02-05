const Authority = require('../model/authority');

module.exports = () => {
    function map(json) {
        return new Authority(json.LocalAuthorityId, json.Name);
    }

    return {
        map,
    };
};
