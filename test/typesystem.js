var assert = require("assert");
var typesystem = require("../src/index");

describe("typesystem", function() {
  it("sorter rasutsatthet", function() {
    const expected = ["RU-A", "RU-B", "RU-C", "RU-D", "RU-E", "RU-¤"].join(",");
    assert.equal(
      typesystem
        .sorterKoder(["RU-¤", "RU-D", "RU-A", "RU-C", "RU-E", "RU-B"])
        .join(","),
      expected
    );
  });
  it("splitt T44-E-1", function() {
    assert.equal(typesystem.splittKode("NA-T44-E-1").join("/"), "NA/T/44/E-1");
  });
  it("splitt BS-1_AG_A_0", function() {
    assert.equal(typesystem.splittKode("BS-1_AG_A_0").join("/"), "BS/1/AG/A/0");
  });
  it("forelder T44", function() {
    assert.equal(typesystem.forelder("NA-T44"), "NA-T");
  });
  it("forelder T44-E1-C2", function() {
    assert.equal(typesystem.forelder("NA-T44-E-2"), "NA-T44");
  });
  it("forelder NA-LKM-S3-E-0", function() {
    assert.equal(typesystem.forelder("NA-LKM-S3-E-0"), "NA-LKM-S3-E");
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
    assert.equal(
      typesystem
        .hentNivaa(
          "Natur_i_Norge/Natursystem/Typeinndeling/Fastmarkssystemer/Åker"
        )
        .join(","),
      "Hovedtype,Hovedtypegruppe,Naturtype,Natursystem,Natur i Norge"
    );
  });
  it("Nivå for katalog", function() {
    assert.equal(typesystem.hentNivaa("").join(","), "");
  });
  it("Nivå for bebygd", function() {
    assert.equal(
      typesystem
        .hentNivaa(
          "Natur_i_Norge/Landskap/Landskapsgradient/Arealbruksintensitet/Lav_arealbruksintensitet"
        )
        .join(","),
      "Gradienttrinn,Landskapsgradient,Landskapsgradient,Landskap,Natur i Norge"
    );
  });
  it("Nivå for rødliste", function() {
    assert.equal(
      typesystem.hentNivaa("Truet_art_natur").join(","),
      "Rødlistekategori"
    );
  });
  it("Nivå for beskrivelsessystem", function() {
    assert.equal(
      typesystem
        .hentNivaa("Natur_i_Norge/Natursystem/Beskrivelsessystem")
        .join(","),
      "Beskrivelsesystem,Natursystem,Natur i Norge"
    );
  });
  it("Nivå for bioklimatisk sone 4", function() {
    assert.equal(
      typesystem
        .hentNivaa(
          "Natur_i_Norge/Natursystem/Beskrivelsessystem/Regional_naturvariasjon/Bioklimatiske_soner/Lavalpin_sone_(LA)"
        )
        .join(","),
      "Verdi,Variabel,Kilde til variasjon,Beskrivelsesystem,Natursystem,Natur i Norge"
    );
  });
  it("Nivå for Børgefjell", function() {
    assert.equal(
      typesystem
        .hentNivaa("Naturvernområde/Børgefjell_Byrkije_nasjonalpark")
        .join(","),
      "Naturvernområde"
    );
  });
  it("NA foreldre", function() {
    assert.equal(typesystem.forfedre("NA").join(","), "NA");
  });
  it("T44-B-1 foreldre", function() {
    assert.equal(
      typesystem.forfedre("NA-T44-B-1").join(","),
      "NA,NA-T,NA-T44,NA-T44-B,NA-T44-B-1"
    );
  });
  it("T44-B-1 foreldre", function() {
    assert.equal(
      typesystem.forfedre("NA-T44-B-1").join(","),
      "NA,NA-T,NA-T44,NA-T44-B,NA-T44-B-1"
    );
  });
  it("NN-NA-I-1 nivå", function() {
    debugger;
    assert.equal(
      typesystem
        .hentNivaa(
          "Natur_i_Norge/Natursystem/Typeinndeling/Snø-_og_issystemer/Snø-"
        )
        .join(","),
      "Hovedtype,Hovedtypegruppe,Naturtype,Natursystem,Natur i Norge"
    );
  });
});
