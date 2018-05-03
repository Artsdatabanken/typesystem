var assert = require("assert");
var Art = require("../src/art");

const art = new Art();

describe("Art", function() {
  it("lag kode 32", function() {
    assert.equal(art.lagKode("32"), "AR_32");
  });
});
