// asdf
const natursystem = require("./NA-metoder");
const art = require("./AR-metoder");
const administrativtOmråde = require("./AO-metoder");
const miljøvariabel = require("./MI-metoder");
const fremmedArt = require("./FA-metoder");
const verneområde = require("./VV-metoder");
const nivåer = require("./nivåer");

function sorteringsnøkkel(kode) {
  kode = kode.replace("+", "Y");
  kode = kode.replace("¤", "Z");
  return kode;
}

const typesystem = {
  art: art,
  natursystem: natursystem,
  administrativtOmråde: administrativtOmråde,
  miljøvariabel: miljøvariabel,
  fremmedArt: fremmedArt,
  administrativtOmråde: administrativtOmråde,
  verneområde: verneområde,
  rotkode: "~",
  nivåer: nivåer,

  /*
   * Sorterer kodene slik at spesielt gradientverdier havner i rekkefølge
   * fra lav til høy verdi
   */
  sorterKoder(koder) {
    return koder.sort((a, b) => {
      return sorteringsnøkkel(a) > sorteringsnøkkel(b) ? 1 : -1;
    });
  },

  nivå(cursor, frags) {
    if (!cursor) return null;
    const len = frags.length;
    let frag = frags.shift();
    if (!cursor[frag]) {
      return cursor.nivå.slice(0, len + 1).reverse();
    }
    let r = this.nivå(cursor[frag], frags);
    if (!cursor.nivå) throw new Error("Mangler nivå i " + frag);
    r.push(cursor.nivå[0]);
    return r;
  },

  hentNivaa(url) {
    if (!url) return [];
    let cursor = this.nivåer;
    const frags = url.split("/");
    let frag = frags.shift();
    return this.nivå(cursor[frag], frags);
  },

  erSkille: function(c, p) {
    if ("_-".indexOf(p) >= 0) return false;
    if ("_-".indexOf(c) >= 0) return true;
    const digits = "0123456789";
    const cdig = digits.indexOf(c) >= 0;
    const pdig = digits.indexOf(p) >= 0;
    return cdig !== pdig;
  },

  forfedre: function(kode) {
    const stack = [];
    let prefix = "";
    let prev = "A";
    for (let i = 0; i < kode.length; i++) {
      const c = kode[i];
      if (this.erSkille(c, prev)) stack.push(prefix);
      prefix += c;
      prev = c;
    }
    stack.push(prefix);
    return stack;
  },

  forelder: function(kode) {
    const segments = this.splittKode(kode);
    if (segments.length <= 0) return null;
    const trimOff = segments[segments.length - 1].length;
    let end = kode.length - trimOff;
    if (end > 0 && "-_".indexOf(kode[end - 1]) >= 0) end -= 1;
    return kode.substring(0, end);
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
  },

  finnForeldre: function(kode, r) {
    if (kode === typesystem.rotkode) return [];
    const segs = typesystem.splittKode(kode);
    if (segs.length <= 1) return [typesystem.rotkode];
    const len = segs[segs.length - 1].length;
    kode = kode.substring(0, kode.length - len);
    while (kode.length > 0) {
      if (kode in r) return [kode];
      kode = kode.substring(0, kode.length - 1);
    }
    return [typesystem.rotkode];
  },

  kobleForeldre: function(r) {
    for (let key of Object.keys(r)) {
      const node = r[key];
      if (!node.foreldre) node.foreldre = finnForeldre(key, r);
    }
  }
};

module.exports = typesystem;
