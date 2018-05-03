var assert = require("assert");
var typesystem = require("../src/index");

describe("typesystem", function() {
  it("splitt T44-E-1", function() {
    assert.equal(typesystem.splittKode("NA_T44-E-1").join("/"), "NA/T/44/E/1");
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
});
