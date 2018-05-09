const AO = require("./AO");
const felles = require("./felles");

const administrativtOmråde = {};

module.exports = { ...administrativtOmråde, ...AO, ...felles };
