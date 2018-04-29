var assert = require("assert");
var typesystem = require("../index");

describe("typesystem", function() {
  it("returns null when passed a non-number", function() {
    assert.equal(typesystem.splittKode("NA_T44-E-1").join("/"), "NA/T/44/E/1");
  });
});
