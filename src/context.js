const ports = require('./services/ports');
const accounts = require('./services/accounts');
const companies = require('./services/companies');
const networks = require('./services/networks');

module.exports = function createContext(_req) {
  return {
    ports: ports(),
    accounts: accounts(),
    companies: companies(),
    networks: networks(),
  };
};
