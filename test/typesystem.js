var assert = require("assert");
var typesystem = require("../src/index");

describe("typesystem", function() {
  it("splitt T44-E-1", function() {
    assert.equal(typesystem.splittKode("NA_T44-E-1").join("/"), "NA/T/44/E/1");
  });
  it("splitt BS_1_AG_A_0", function() {
    assert.equal(typesystem.splittKode("BS_1_AG_A_0").join("/"), "BS/1/AG/A/0");
  });
  it("splitt T44-E-1", function() {
    assert.equal(
      typesystem.splittKodeMalestokk("NA_T44-E-1").join("/"),
      "NA/T/44/E-1"
    );
  });

  it("Davvisámegiella med gyldige tegn", function() {
    assert.equal(
      typesystem.medGyldigeTegn("Davvisámegiella"),
      "Davvismegiella"
    );
  });
  it("Kapitaliserer canis lupus", function() {
    assert.equal(typesystem.capitalizeTittel("cAnis LuPus"), "Canis lupus");
  });
  it("Nivå for åker", function() {
    assert.equal(typesystem.hentNivå("NA_T44"), "hovedtype");
  });
});
