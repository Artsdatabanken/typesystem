function leggTilPrefiks(ending) {
  return this.prefiks + "_" + ending;
}

function klasse() {
  return this.nivåer[0];
}

module.exports = { leggTilPrefiks, klasse };
