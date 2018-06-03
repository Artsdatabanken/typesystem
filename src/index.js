const natursystem = require("./NA-metoder");
const art = require("./AR-metoder");
const administrativtOmråde = require("./AO-metoder");
const miljøvariabel = require("./MI-metoder");
const fremmedArt = require("./FA-metoder");
const verneområde = require("./VV-metoder");

const typesystem = {
  art: art,
  natursystem: natursystem,
  administrativtOmråde: administrativtOmråde,
  miljøvariabel: miljøvariabel,
  fremmedArt: fremmedArt,
  administrativtOmråde: administrativtOmråde,
  verneområde: verneområde,
  rotkode: "~",

  // Deler opp koden i ett array av segmenter, 1 for hvert nivå
  // i.e. 'NA_T44-E-1 => ['NA','T','44','E','1']
  splittKode: function(kode) {
    let segments = kode.match(/[a-zA-Z]+|[0-9]+/g);
    return segments || [];
  },

  // Erstatter tegn som ikke kan brukes i en url
  medGyldigeTegn: function(s) {
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
  },

  capitalizeTittel: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
};

module.exports = typesystem;