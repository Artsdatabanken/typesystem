class Kodesystem {
  constructor(prefix) {
    this.prefix = prefix;
  }

  prefixed(ending) {
    return this.prefix + "_" + ending;
  }
}

module.exports = Kodesystem;
