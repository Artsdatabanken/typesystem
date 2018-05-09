const AR = require("./AR");
const felles = require("./felles");

const Art = {
  lagKode(scientificNameId) {
    if (scientificNameId === 0) return this.prefiks;
    return this.leggTilPrefiks(scientificNameId);
  }
};

module.exports = { ...felles, ...Art, ...AR };
