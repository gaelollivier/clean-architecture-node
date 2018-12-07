module.exports = ({
  accountCollection: { findAccount },
  notificationService: { sendNotification },
}) => {
  async function someUseCase() {
    const account = await findAccount({
      _id: 'someId',
    });

    if (account.type === 'USER') {
      sendNotification(account);
    }
  }

  return {
    someUseCase,
  };
};
