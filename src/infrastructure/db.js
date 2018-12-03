const { MongoClient } = require('mongodb');

async function connectDb() {
  const client = await MongoClient.connect(
    'mongodb://localhost',
    { useNewUrlParser: true }
  );

  console.log('Connected to mongo');

  // return handle to database
  return client.db('db');
}

module.exports = {
  connectDb,
};
