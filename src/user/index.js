const getServices = ({ dbClient }) => {
  const accountRepository = require('./account/repository')({
    dbClient,
  });

  return {
    accountService: require('./account/service')({
      accountRepository,
    }),
  };
};

const setupREST = app => {
  require('./account/rest').setupREST(app);
};

module.exports = {
  getServices,
  setupREST,
};
