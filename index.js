const Natursystem = require("./natursystem");
const Art = require("./art");

class Typesystem {
  constructor() {
    this.Art = new Art();
    this.Natursystem = new Natursystem();
  }

  // Deler opp koden i ett array av segmenter, 1 for hvert nivå
  // i.e. 'NA_T44-E-1 => ['NA','T','44','E','1']
  splittKode(kode) {
    let segments = kode.match(/[a-zA-Z]+|[0-9]+/g);
    return segments || [];
  }

  // Erstatter tegn som ikke kan brukes i en url
  medGyldigeTegn(s) {
    const r = s
      .split("")
      .map(c => {
        const lc = c.toLowerCase();
        if ("_,./()[] ".indexOf(c) >= 0) return "_";
        if ("abcdefghijklmnopqrstuvxyzæøå0123456789".indexOf(lc) >= 0) return c;
        return "";
      })
      .join("");
    return r;
  }

  capitalizeTittel(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

module.exports = new Typesystem();
