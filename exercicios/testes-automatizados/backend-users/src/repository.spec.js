const UserRepository = require("./repository");
const { MongoClient } = require("mongodb");

describe("UserRepository", () => {
  let client;
  let collection;
  let repository;

  // BeforeAll and AfterAll are executed only once
  beforeAll(async () => {
    const dsn = "mongodb://root:root@localhost?retryWrites=true&writeConcern=majority";
    client = new MongoClient(dsn);
    collection = client.db("users_db").collection("users");
    repository = new UserRepository(collection);
    await client.connect();
  });

  afterAll(async () => {
    await client.close();
  });

  // BeforeEach is executed before each test
  beforeEach(async () => {
    await collection.deleteMany();
  });  

  describe("Getting a list of users", () => {
    test("should return a list of users", async () => {
      await collection.insertMany([
        {
          name: "João",
          email: "joao@email.com",
          password: "123456"
        }
      ]);

      const users = await repository.findAll();
      
      expect(users.length).toBe(1);
      expect(users[0]).toEqual(expect.objectContaining(
        {
          name: "João",
          email: "joao@email.com",
          password: "123456"
        }
      ));
    });
  });

  describe("Getting a single user", () => {
    test("should return a single user", async () => {
      const result = await collection.insertOne({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      const user = await repository.find(result.insertedId);

      expect(user).toEqual(expect.objectContaining(
        {
          name: "João",
          email: "joao@email.com",
          password: "123456"
        }
      ));
    });

    test("should return null if user not found ", async () => {
      const user = await repository.find("67e81dbf13b60388bbcddf14");

      expect(user).toBeNull();
    });
  });

  describe("Creating a user", () => {
    test("should create a user", async () => {
      const user = await repository.create({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      expect(user).toEqual(expect.objectContaining(
        {
          name: "João",
          email: "joao@email.com",
          password: "123456"
        }
      ));
    });
  });

  describe("Updating a user", () => {
    test("should update a user", async () => {
      const result = await collection.insertOne({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      const user = await repository.update(result.insertedId, {
        name: "Maria",
        email: "maria@email.com",
        password: "654321"
      });

      expect(user).toEqual(expect.objectContaining(
        {
          name: "Maria",
          email: "maria@email.com",
          password: "654321"
        }
      ));
    });

    test("should return null if user not found when updating", async () => {
      const user = await repository.update("67e81dbf13b60388bbcddf14", {
        name: "Maria",
        email: "maria@email.com",
        password: "654321"
      });

      expect(user).toBeNull();
    });
  });

  describe("Deleting a user", () => {
    test("should delete a user", async () => {
      const result = await collection.insertOne({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      const user = await repository.delete(result.insertedId);

      expect(user).toBe(true);
    });

    test("should return false if user not found when deleting", async () => {
      const user = await repository.delete("67e81dbf13b60388bbcddf14");

      expect(user).toBe(false);
    });
  });
});