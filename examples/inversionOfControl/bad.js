const dbClient = require('dbClient');
const notificationService = require('notificationService');

async function someUseCase() {
  const account = await dbClient.collection('accounts').findOne({
    _id: 'someId',
  });

  if (account.type === 'USER') {
    notificationService.sendNotification(account);
  }
}

module.exports = {
  someUseCase,
};
