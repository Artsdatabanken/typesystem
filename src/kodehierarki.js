// Bygger dictionaries for å finne foreldre eller barn av typer

function lagHierarki(data) {
  var p2c = {},
    c2p = {};
  Object.keys(data).forEach(kode => {
    const node = data[kode];
    mapForelderTilBarn(kode, node);
  });
  const hierarki = { barn: p2c, foreldre: c2p };
  return hierarki;
}

function mapForelderTilBarn(kode, node) {
  if (!c2p[kode]) c2p[kode] = [];
  if (!node.foreldre) {
    if (!node.se) {
      throw new Error("Mangler forelder: " + kode);
    }
    return;
  } else {
    let foreldre = node.foreldre;
    foreldre.forEach(forelderkode => {
      if (!p2c[forelderkode]) p2c[forelderkode] = [];
      p2c[forelderkode].push(kode);
      if (!c2p[kode].includes(forelderkode)) c2p[kode].push(forelderkode);
    });
    if (node.barn)
      node.barn.forEach(barnkode => {
        if (!p2c[kode]) p2c[kode] = [];
        if (!c2p[barnkode]) c2p[barnkode] = [];
        if (!c2p[barnkode].includes(kode)) c2p[barnkode].push(kode);
        if (!p2c[kode].includes(barnkode)) c2p[kode].push(barnkode);
        p2c[kode].push(barnkode);
      });
  }
}

module.exports = lagHierarki;
