const assert = require('assert');
const Authority = require('../../../src/model/authority');
const AuthorityMapper = require('../../../src/mapper/authority');
const authorityMapper = AuthorityMapper();

describe('Authority Mapper', () => {
    let response;
    context('map', () => {
        it('should return a valid Authority model when given valid JSON', () => {
            const json = {
                LocalAuthorityId: 1,
                LocalAuthorityIdCode: "120",
                Name: 'Test Authority',
                FriendlyName: 'test-authority',
            };
            const expected = new Authority(1, 'Test Authority');
            const actual = authorityMapper.map(json);

            assert.deepEqual(actual, expected);
        });
    });
});
