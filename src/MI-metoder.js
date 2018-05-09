const MI = require("./MI");
const felles = require("./felles");

const Miljøvariabel = {};

module.exports = { ...Miljøvariabel, ...MI, ...felles };
