// Bygger dictionaries for å finne foreldre eller barn av typer

function lagHierarki(data) {
  const hierarki = { barn: {}, foreldre: {} };
  Object.keys(data).forEach(kode => {
    const node = data[kode];
    mapForelderTilBarn(kode, node, hierarki);
  });
  return hierarki;
}

function mapForelderTilBarn(kode, node, hierarki) {
  const c2p = hierarki.foreldre;
  const p2c = hierarki.barn;
  if (!c2p[kode]) c2p[kode] = [];
  if (!node.foreldre) {
    if (!node.se) {
      throw new Error("Mangler forelder: " + kode);
    }
    return;
  }
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

module.exports = lagHierarki;
