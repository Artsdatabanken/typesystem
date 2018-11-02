var assert = require("assert")
var typesystem = require("../src/index")

describe("typesystem", function() {
  it("splitt T44-E-1", function() {
    assert.equal(typesystem.splittKode("NA-T44-E-1").join("/"), "NA/T/44/E-1")
  })
  it("splitt BS-1_AG_A_0", function() {
    assert.equal(typesystem.splittKode("BS-1_AG_A_0").join("/"), "BS/1/AG/A/0")
  })
  it("forelder T44", function() {
    assert.equal(typesystem.forelder("NA-T44"), "NA-T")
  })
  it("forelder T44-E1-C2", function() {
    assert.equal(typesystem.forelder("NA-T44-E-2"), "NA-T44")
  })

  it("Davvisámegiella med gyldige tegn", function() {
    assert.equal(typesystem.medGyldigeTegn("Davvisámegiella"), "Davvismegiella")
  })
  it("Kapitaliserer canis lupus", function() {
    assert.equal(typesystem.capitalizeTittel("cAnis LuPus"), "Canis lupus")
  })
  it("Nivå for åker", function() {
    assert.equal(
      typesystem.hentNivaa("NA-T44").join(","),
      "hovedtype,hovedtypegruppe,naturmangfold"
    )
  })
  it("NA foreldre", function() {
    assert.equal(typesystem.forfedre("NA").join(","), "NA")
  })
  it("T44-B-1 foreldre", function() {
    assert.equal(
      typesystem.forfedre("NA-T44-B-1").join(","),
      "NA,NA-T,NA-T44,NA-T44-B,NA-T44-B-1"
    )
  })
  it("T44-B-1 foreldre", function() {
    assert.equal(
      typesystem.forfedre("NA-T44-B-1").join(","),
      "NA,NA-T,NA-T44,NA-T44-B,NA-T44-B-1"
    )
  })
})
