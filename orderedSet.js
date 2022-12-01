"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderedSet = void 0;
class OrderedSet extends Array {
    constructor(itemType, equalsFn, values) {
        super();
        this._checkType = (value) => value.constructor.name === this.itemType;
        if (equalsFn) {
            this.equalsFn = equalsFn;
        }
        else {
            this.equalsFn = (a, b) => a === b;
        }
        this.itemType = itemType;
        if (values) {
            this.addAll(values);
        }
    }
    add(value) {
        if (!value || this._checkType(value) === false) {
            return this;
        }
        this.push(value);
        return this;
    }
    addAll(values) {
        if (!values || values.length === 0) {
            return;
        }
        values.every((item) => this.push(item));
    }
    push(value) {
        if (!value || this._checkType(value) == false) {
            return this.size();
        }
        if (this.has(value) === false) {
            return super.push(value);
        }
        else {
            return this.size();
        }
    }
    has(value) {
        if (!value || this._checkType(value) === false) {
            return false;
        }
        let found = false;
        super.forEach(item => {
            if (this.equalsFn(value, item) === true) {
                found = true;
                // should we break here?
            }
        });
        return found;
    }
    hasAll(values) {
        if (!values || values.length === 0) {
            return false;
        }
        return values.every((item) => this.has(item));
    }
    size() {
        return this.length;
    }
    delete(value) {
        if (!value || this._checkType(value) === false) {
            return false;
        }
        let foundIndex = -1;
        super.forEach((item, index) => {
            if (this.equalsFn(value, item) === true) {
                foundIndex = index;
            }
        });
        if (foundIndex !== -1) {
            super.splice(foundIndex, 1);
            return true;
        }
        else {
            return false;
        }
    }
    deleteAll(values) {
        if (!values || values.length === 0) {
            return false;
        }
        return values.every((item) => this.delete(item));
    }
    clear() {
        super.splice(0, this.length);
    }
    toArray() {
        let result = [];
        super.forEach((item) => result.push(item));
        return result;
    }
    equals(obj) {
        if (!obj) {
            return false;
        }
        return obj.size() === this.size()
            && this.every((item) => obj.has(item))
            && this.itemType === obj.itemType;
    }
}
exports.OrderedSet = OrderedSet;
//# sourceMappingURL=orderedSet.js.map