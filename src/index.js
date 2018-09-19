const natursystem = require("./NA-metoder")
const art = require("./AR-metoder")
const administrativtOmråde = require("./AO-metoder")
const miljøvariabel = require("./MI-metoder")
const fremmedArt = require("./FA-metoder")
const verneområde = require("./VV-metoder")
const nivåer = require("./nivåer")

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

  hentNivaa(kode) {
    const frags = this.splittKode(kode)
    const prefiks = frags[0]
    if (!(prefiks in this.nivåer)) return []
    const grein = this.nivåer[prefiks]
    return grein.slice(0, frags.length).reverse()
  },

  // Deler opp koden i ett array av segmenter, 1 for hvert nivå
  // tar hensyn til målestokk for NA
  // i.e. 'NA_T44-E-1 => ['NA','T','44','E-1']
  splittKode: function(kode) {
    if (kode && kode.toUpperCase().indexOf("NA") === 0) {
      let segments = kode.match(/([a-eA-E]-[0-9]+)|[a-zA-Z]+|[0-9]+/g)
      return segments || []
    }
    let segments = kode.match(/[a-zA-Z]+|[0-9]+/g)
    return segments || []
  },

  erSkille: function(c, p) {
    if ("_-".indexOf(c) >= 0) return true
    //if ("_-".indexOf(p) >= 0) return false
    const digits = "0123456789"
    const cdig = digits.indexOf(c) >= 0
    const pdig = digits.indexOf(p) >= 0
    return cdig !== pdig
  },

  forfedre: function(kode) {
    const stack = []
    let prefix = ""
    let prev = "A"
    for (let i = 0; i < kode.length; i++) {
      const c = kode[i]
      if (this.erSkille(c, prev)) stack.push(prefix)
      prefix += c
      prev = c
    }
    stack.push(prefix)
    return stack
  },

  forelder: function(kode) {
    const segments = this.splittKode(kode)
    if (segments.length <= 0) return null
    const trimOff = segments[segments.length - 1].length
    let end = kode.length - trimOff
    console.log(end)
    console.log(kode.substring(0, end))
    if (end > 0 && "-_".indexOf(kode[end - 1]) >= 0) end -= 1
    console.log(end)
    console.log(kode.substring(0, end))
    return kode.substring(0, end)
  },

  // Erstatter tegn som ikke kan brukes i en url
  medGyldigeTegn: function(s) {
    const r = s
      .split("")
      .map(c => {
        const lc = c.toLowerCase()
        if ("_,./()[] ".indexOf(c) >= 0) return "_"
        if ("abcdefghijklmnopqrstuvxyzæøå0123456789".indexOf(lc) >= 0) return c
        return ""
      })
      .join("")
    return r
  },

  capitalizeTittel: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
}

module.exports = typesystem
