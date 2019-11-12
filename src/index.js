const lagHierarki = require("./kodehierarki");

const typesystem = {
  lagHierarki,

  finnForeldre: function(kode, r) {
    const segs = this.splittKode(kode);
    if (segs.length <= 1) return [];
    const len = segs[segs.length - 1].length;
    kode = kode.substring(0, kode.length - len);
    while (kode.length > 0) {
      if (kode in r) return [kode];
      kode = kode.substring(0, kode.length - 1);
    }
    return [];
  },

  kobleForeldre: function(r) {
    for (let key of Object.keys(r)) {
      const node = r[key];
      if (!node.foreldre) node.foreldre = this.finnForeldre(key, r);
    }
  },

  // Deler opp koden i ett array av segmenter, 1 for hvert nivå
  // tar hensyn til målestokk for NA
  // i.e. 'NA-T44-E-1 => ['NA','T','44','E-1']
  splittKode: function(kode) {
    if (kode && kode.toUpperCase().indexOf("NA") === 0) {
      // HACK: treat C-2, E-1 etc as one level
      let segments = kode.match(/([a-eA-E]-[1-9]+)|[a-zA-Z]+|[0-9]+/g);
      return segments || [];
    }
    let segments = kode.match(/[a-zA-Z]+|[0-9]+/g);
    return segments || [];
  }
};

module.exports = typesystem;
