var assert = require("assert");
var art = require("../src/AR-metoder");

describe("Art", function() {
  it("lag kode 32", function() {
    assert.equal(art.lagKode("32"), "AR_32");
  });
});
