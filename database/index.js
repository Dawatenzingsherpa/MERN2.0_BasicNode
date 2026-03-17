const mongoose = require('mongoose');

const connectionString = "mongodb://dawa:123@ac-f0no1pn-shard-00-00.ueriigb.mongodb.net:27017,ac-f0no1pn-shard-00-01.ueriigb.mongodb.net:27017,ac-f0no1pn-shard-00-02.ueriigb.mongodb.net:27017/?ssl=true&replicaSet=atlas-r1fxqn-shard-0&authSource=admin&appName=Cluster0";

async function connectToDatabase() {
  await mongoose.connect(connectionString);
  console.log("connect to DB successfully");
}

module.exports = connectToDatabase  