const NA = require("./NA");
const felles = require("./felles");

// Natur i Norge (NiN) kodesystem
const Natursystem = {
  // Slår opp hovedtypen til en grunntype eller kartleggingsenhet
  slåOppHovedtype: function(subkode) {
    return subkode.split("-")[0];
  },

  // Sjekker om koden er en NiN grunntype
  erGrunntype: function(kode) {
    return !!kode.match(/NA_[A-Z][0-9]+-[0-9]+/gi);
  },

  // Sjekker om koden er på kartleggingsnivå over grunntype (1:500)
  erHøyereKartleggingsnivå: function(kode) {
    return !!kode.match(/-[BCDE]-/gi);
  }
};

module.exports = { ...felles, ...Natursystem, ...NA };
