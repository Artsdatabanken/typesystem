const Kodesystem = require("./kodesystem");

class Art extends Kodesystem {
  constructor() {
    super("AR");
  }

  lagKode(scientificNameId) {
    if (scientificNameId === 0) return this.prefix;
    return this.prefixed(scientificNameId);
  }
}

module.exports = Art;
