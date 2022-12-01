// Based on https://vianneyfaivre.com/tech/ordered-set-in-typescript

export class OrderedSet<T> extends Array<T> {

  private equalsFn: (a: T, b: T) => boolean;
  private itemType: string;
  private _checkType = (value: T) => value.constructor.name === this.itemType;

  constructor(itemType: string, equalsFn?: (a: T, b: T) => boolean, values?: Array<T>) {
    super();

    if (equalsFn) {
      this.equalsFn = equalsFn;
    } else {
      this.equalsFn = (a: T, b: T) => a === b;
    }

    this.itemType = itemType;

    if (values) {
      this.addAll(values);
    }
  }

  add(value: T): OrderedSet<T> {
    if (!value || this._checkType(value) === false) {
      return this;
    }

    this.push(value);
    return this;
  }

  addAll(values: Array<T>): void {
    if (!values || values.length === 0) {
      return;
    }

    values.every((item) => this.push(item));
  }

  push(value: T): number {
    if (!value || this._checkType(value) == false) {
      return this.size();
    }

    if (this.has(value) === false) {
      return super.push(value);
    } else {
      return this.size();
    }
  }

  has(value: T): boolean {
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

  hasAll(values: Array<T>): boolean {
    if (!values || values.length === 0) {
      return false;
    }

    return values.every((item) => this.has(item));
  }

  size(): number {
    return this.length;
  }

  delete(value: T): boolean {
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
    } else {
      return false;
    }
  }

  deleteAll(values: Array<T>): boolean {
    if (!values || values.length === 0) {
      return false;
    }

    return values.every((item) => this.delete(item));
  }

  clear(): void {
    super.splice(0, this.length);
  }

  toArray(): Array<T> {
    let result: Array<T> = [];
    super.forEach((item) => result.push(item));
    return result;
  }

  equals(obj: OrderedSet<T>): boolean {
    if (!obj) {
      return false;
    }

    return obj.size() === this.size()
      && this.every((item) => obj.has(item))
      && this.itemType === obj.itemType;
  }

}