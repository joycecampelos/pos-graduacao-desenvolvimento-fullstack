const UserRepository = require("./repository");
const cors = require("cors");
const express = require("express");
const {MongoClient} = require("mongodb");

const app = express();
let client;

const createUserRepository = () => {
  const dsn = "mongodb://root:root@localhost?retryWrites=true&writeConcern=majority";
  client = new MongoClient(dsn);
  const collection = client.db("users_db").collection("users");
  return new UserRepository(collection);
};

const isUserValid = (user) => {
  return user.name !== undefined && user.email !== undefined && user.password !== undefined;
};

const normalizeUser = (user) => {
  user.id = user._id;
  delete user._id;
  return user;
};

app.use(express.json());
app.use(cors({
  exposedHeaders: ["Content-range"]
}));

// Return all users
app.get("/users", async (req, res) => {
  const repository = createUserRepository();
  await client.connect();

  const users = await repository.findAll();
  res.setHeader("Content-range", users.length);
  res.json(users.map(normalizeUser));
  
  client.close();
});

// Return a single user
app.get("/users/:id", async (req, res) => {
  const repository = await createUserRepository();
  await client.connect();

  const user = await repository.find(req.params.id);
  if (user === null) {
    res.status(404).json({
      message: "User not found"
    });
  } else {
    res.json(normalizeUser(user));
  }
  
  client.close();
});

// Create a new user
app.post("/users", async (req, res) => {
  const repository = await createUserRepository();
  await client.connect();

  if (isUserValid(req.body)) {
    const user = await repository.create(req.body);
    res.status(201).json(normalizeUser(user));
  } else {
    res.status(400).json({
      message: "Invalid request body"
    });
  }

  client.close();
});

// Update a user
app.put("/users/:id", async (req, res) => {
  if (!isUserValid(req.body)) {
    res.status(400).json({
      message: "Invalid request body"
    });
    return;
  }

  const repository = await createUserRepository();
  await client.connect();

  const user = await repository.update(req.params.id, req.body);
  if (user === null) {
    res.status(404).json({
      message: "User not found"
    });
  } else {
    res.json(normalizeUser(user));
  }
  
  client.close();
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  const repository = await createUserRepository();
  await client.connect();

  const user = await repository.delete(req.params.id);
  if (user) {
    res.status(204).json({});
  } else {
    res.status(404).json({
      message: "User not found"
    });
  }

  client.close();
});

app.delete("/users", async (req, res) => {
  const repository = await createUserRepository();
  await client.connect();

  await repository.deleteAll();
  res.status(204).json({});

  client.close();
});

module.exports = app;