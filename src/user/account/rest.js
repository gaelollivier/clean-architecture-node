const handleGetAccount = async (req, res) => {
  // extract service from context
  const {
    services: {
      user: {
        accountService: { getAccount },
      },
    },
  } = req;

  // extract input from query
  const { accountId } = req.params;

  // call service
  const account = await getAccount(accountId);

  // handle serialization of result from service
  res.json(account);
};

const handleGetAccounts = async (req, res) => {
  // extract service from context
  const {
    services: {
      user: {
        accountService: { getAccounts },
      },
    },
    currentUser,
  } = req;

  // call service
  const accounts = await getAccounts(currentUser);

  // handle serialization of result from service
  res.json(accounts);
};

const setupREST = app => {
  app.get('/accounts/:accountId', handleGetAccount);
  app.get('/accounts/', handleGetAccounts);
};

module.exports = {
  setupREST,
};
