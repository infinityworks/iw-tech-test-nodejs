module.exports = class AuthorityRating {
    constructor(name, value) {
        this._name = name;
        this._value = value;
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    toObject() {
        return { name: this._name, value: this._value };
    }
};
