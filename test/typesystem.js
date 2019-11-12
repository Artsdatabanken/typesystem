var assert = require("assert");
var typesystem = require("../src/index");

describe("typesystem", function() {
  it("splitt T44-E-1", function() {
    assert.equal(typesystem.splittKode("NA-T44-E-1").join("/"), "NA/T/44/E-1");
  });
  it("splitt BS-1_AG_A_0", function() {
    assert.equal(typesystem.splittKode("BS-1_AG_A_0").join("/"), "BS/1/AG/A/0");
  });
});
