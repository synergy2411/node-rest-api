const mongoClient = require("mongodb").MongoClient;
const environment = require("../environment/environment");
let _db, client;
const connect = () => {
  mongoClient.connect(
    environment.mongoUrl,
    { useUnifiedTopology: true },
    (err, mongo) => {
      if (err) {
        console.log("Error", err);
      }
      _db = mongo.db("socgen_db");
      client = mongo;
      if (_db) {
        // insertRecord();
        // findRecord();
        // updateRecord();
        deleteRecord();
      }
    }
  );
};
const insertRecord = () => {
  _db.collection("users").insertOne(
    {
      username: "foo",
      password: "bar",
    },
    (err, result) => {
      if (err) {
        console.log(err);
        client.close();
      }
      console.log(result.ops);
      client.close();
    }
  );
};
const findRecord = () => {
  _db
    .collection("users")
    .find()
    .toArray((err, docs) => {
      if (err) {
        console.log(err);
        client.close();
      }
      console.log(docs);
      client.close();
    });
};
const updateRecord = () => {
  _db.collection("users").updateOne(
    { username: "foo" },
    {
      $set: { password: "foo12345" },
    },
    (err, result) => {
      if (err) {
        console.log(err);
        client.close();
      }
      console.log(result);
      client.close();
    }
  );
};
const deleteRecord = () => {
  _db.collection("users").deleteOne({ password: "foo12345" }, (err, result) => {
    if (err) {
      console.log(err);
      client.close();
    }
    console.log(result);
    client.close();
  });
};

connect();

module.exports = {
  connect,
  insertRecord,
  findRecord,
  updateRecord,
  deleteRecord,
};
