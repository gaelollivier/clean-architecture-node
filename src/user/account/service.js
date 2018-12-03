const { ACCOUNT_TYPES } = require('./model');

module.exports = ({ accountRepository }) => {
  const getAccount = accountId => {
    return accountRepository.getAccount(accountId);
  };

  const getAccounts = async currentUser => {
    // only admins can list accounts
    if (currentUser.type !== ACCOUNT_TYPES.ADMIN) {
      throw new Error('Only admins can list accounts');
    }
    return accountRepository.getAccounts();
  };

  const getAccountsForCompany = companyId => {
    return accountRepository.getAccountsForCompany(companyId);
  };

  return {
    getAccount,
    getAccounts,
    getAccountsForCompany,
  };
};
