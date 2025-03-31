import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createUser, getAllUsers, getUserById, updateUser, deleteUserById } from '../services/userService';
import User from '../models/userModel';

describe('createUser Integration Test', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  it('should create a user and save it to the database', async () => {
    const userData = {
      name: 'John',
      email: 'john@grupo3.com',
      password: 'password321',
    };

    const createdUser = await createUser(userData);

    const savedUser = await User.findOne({ email: userData.email });

    expect(savedUser).not.toBeNull(); // Valida se usuário foi criado
    expect(savedUser?.name).toBe(userData.name); // Valida se o nome está correto
    expect(savedUser?.email).toBe(userData.email); // Valida se o email está correto
    expect(savedUser?.password).toMatch(/^\$2[ayb]\$.{56}$/); // Valida se a senha foi convertida em hash
    expect(savedUser?.password).not.toBe(userData.password);
  });

  it('should not create a user', async () => {
    const userData = {
        name: 'John',
        email: 'grupo3.com',
        password: 'password321',
      };
  
      await expect(createUser(userData)).rejects.toMatchObject({
        errors: [
          {
            validation: 'email',
            code: 'invalid_string',
            message: 'Email inválido!',
            path: ['email'],
          },
        ],
      });
    });

    it('should get all user created', async () => {
        const userData = {
            name: 'John',
            email: 'john@grupo3.com',
            password: 'password321',
          };
      
        const createdUser = await createUser(userData);
        const savedUser = await getAllUsers();
        expect(savedUser).not.toEqual([]);
    });

    it('should get user by ID', async () => {
        const userData = {
            name: 'John',
            email: 'john@grupo3.com',
            password: 'password321',
          };
      
          const createdUser = await createUser(userData);
          const userFind = await getUserById(createdUser._id)
          expect(userFind).not.toBeNull();
          expect(userFind?.name).toBe(userData.name);
    });

    it('should update an user by ID', async () => {
        const userData = {
            name: 'John',
            email: 'john@grupo3.com',
            password: 'password321',
          };
        const newUserData = {
            name: 'Joao',
            email: 'joao@grupo3.com',
            password: 'password321',
        };      
        const createdUser = await createUser(userData);
        const updatedUser = await updateUser(createdUser._id, newUserData);
        expect(updatedUser?.name).toBe(newUserData.name);
        expect(updatedUser?.name).not.toBe(userData.name);
    });

    it('should delete user by ID', async () => {
        const userData = {
            name: 'John',
            email: 'john@grupo3.com',
            password: 'password321',
          };
      
          const createdUser = await createUser(userData);
          const deletedUser = await deleteUserById(createdUser._id)
          const notFindUser = await User.findOne({ email: userData.email });
          expect(notFindUser).toBeNull();
    });
});
