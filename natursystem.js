const Kodesystem = require('./kodesystem')

// Natur i Norge (NiN) kodesystem
class Natursystem extends Kodesystem {
  constructor() {
    super("NA");
  }

  // Slår opp hovedtypen til en grunntype eller kartleggingsenhet
  hovedtype(subkode) {
    return subkode.split("-")[0];
  }

  // Sjekker om koden er en NiN grunntype
  erGrunntype(kode) {
    return !!kode.match(/NA_[A-Z][0-9]+-[0-9]+/gi);
  }

  // Sjekker om koden er et kartleggingsnivå
  erKartleggingsnivå(kode) {
    if (kode.match(/-E-/gi)) return true;
    if (kode.match(/-C-/gi)) return true;
    return false;
  }
}

module.exports = Natursystem;
