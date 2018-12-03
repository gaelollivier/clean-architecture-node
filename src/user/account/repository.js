const ObjectID = require('mongodb').ObjectID;

const { idsFilter } = require('../../infrastructure/dbHelpers');

module.exports = ({ dbClient }) => {
  const getAccount = async accountId => {
    const account = await dbClient.collection('accounts').findOne({
      _id: ObjectID(accountId),
    });

    if (!account) {
      // NOTE: here, we should probably throw instead so error handler can return a 404
      return null;
    }

    return account;
  };

  const getAccounts = ({ accountIds } = {}) => {
    return dbClient
      .collection('accounts')
      .find({
        ...idsFilter(accountIds),
      })
      .toArray();
  };

  const getAccountsForCompany = companyId => {
    return dbClient
      .collection('accounts')
      .find({ company: companyId })
      .toArray();
  };

  return {
    getAccount,
    getAccounts,
    getAccountsForCompany,
  };
};
