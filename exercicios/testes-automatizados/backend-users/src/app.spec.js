const app = require("./app");
const request = require("supertest")(app);
const {MongoClient} = require("mongodb");

describe("Users API", () => {
  let client;
  let collection;

  // BeforeAll and AfterAll are executed only once
  beforeAll(async () => {
    const dsn = "mongodb://root:root@localhost?retryWrites=true&writeConcern=majority";
    client = new MongoClient(dsn);
    collection = client.db("users_db").collection("users");
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
        },
        {
          name: "Maria",
          email: "maria@email.com",
          password: "654321"
        }
      ]);

      const response = await request.get("/users");
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: expect.any(String),
          name: "João",
          email: "joao@email.com",
          password: "123456"
        },
        {
          id: expect.any(String),
          name: "Maria",
          email: "maria@email.com",
          password: "654321"
        }
      ]);
    });
  });

  describe("Getting a single user", () => {
    test("should return a single user", async () => {
      const result = await collection.insertOne({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });
      
      const response = await request.get(`/users/${result.insertedId}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });
    });

    test("should return 404 if user not found", async () => {
      const response = await request.get("/users/67e81dbf13b60388bbcddf14");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "User not found"
      });
    });
  });

  describe("Creating a user", () => {
    test("should create a user", async () => {
      const response = await request.post("/users").send({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });
    });

    test("should return 400 if request body is invalid", async () => {
      const response = await request.post("/users").send({
        name: "João",
        email: "joao@email.com"
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Invalid request body"
      });
    });
  });

  describe("Updating a user", () => {
    test("should update a user", async () => {
      const result = await collection.insertOne({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      const response = await request.put(`/users/${result.insertedId}`).send({
        name: "Maria",
        email: "maria@email.com",
        password: "654321"
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(String),
        name: "Maria",
        email: "maria@email.com",
        password: "654321"
      });
    });
    
    test("should return 404 if user not found when updating", async () => {
      const response = await request.put("/users/67e81dbf13b60388bbcddf14").send({
        name: "Maria",
        email: "maria@email.com",
        password: "654321"
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "User not found"
      });
    });

    test("should return 400 if request body is invalid", async () => {
      const result = await collection.insertOne({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      const response = await request.put(`/users/${result.insertedId}`).send({
        name: "Maria",
        email: "maria@email.com"
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Invalid request body"
      });
    });
  });

  describe("Deleting a user", () => {
    test("should delete a user", async () => {
      const result = await collection.insertOne({
        name: "João",
        email: "joao@email.com",
        password: "123456"
      });

      const response = await request.delete(`/users/${result.insertedId}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
    
    test("should return 404 if user not found when deleting", async () => {
      const response = await request.delete("/users/67e81dbf13b60388bbcddf14");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: "User not found"
      });
    });

    test("should delete all users", async () => {
      await collection.insertMany([
        {
          name: "João",
          email: "joao@email.com",
          password: "123456"
        },
        {
          name: "Maria",
          email: "maria@email.com",
          password: "654321"
        }
      ]);

      const response = await request.delete("/users");

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});