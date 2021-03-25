if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();

MongoClient.connect(process.env.MONGO_DB_CONNECTION_STRING, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("express-api");
    const tasksCollection = db.collection("tasks");
    app.use(express.static("public"));
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("<h1>hello world</h1>");
    });

    app.get("/tasks", (req, res) => {
      db.collection("tasks")
        .find()
        .toArray()
        .then((results) => res.send(results))
        .catch((error) => console.log(error));
    });

    app.listen(process.env.PORT || 3000, () =>
      console.log("Server is running...")
    );
  })
  .catch((error) => console.error(error));
