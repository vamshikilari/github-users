class Cache {
  constructor() {
    this.map = new Map();
  }

  setValue({ key, value }) {
    this.map.set(key, value);
  }

  getValue(key) {
    const isExists = this.hasIt(key);
    if (isExists) {
      return this.map.get(key);
    }
    return null;
  }

  hasIt(key) {
    const hasValue = this.map.has(key);
    if (hasValue) {
      return this.map.get(key);
    }
  }
}

const cache = new Cache();

export default cache;
