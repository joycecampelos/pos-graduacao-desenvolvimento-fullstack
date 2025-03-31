const mongo = require("mongodb");

class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }

  /**
   * Return all users
   */
  async findAll() {
    const result = await this.collection.find({});
    return result.toArray();
  }

  /**
   * Return a single user
   * @param {*} id
   */
  async find(id) {
    return await this.collection.findOne({
      _id: new mongo.ObjectId(id)
    });
  }

  /**
   * Create a new user
   */
  async create(user) {
    await this.collection.insertOne(user);
    return user;
  }

  /**
   * Update a user
   * @param {*} id
   * @param {*} user
   */
  async update(id, user) {
    await this.collection.updateOne({
      _id: new mongo.ObjectId(id)
    }, {
      $set: user
    });
    return this.find(id);
  }

  /**
   * Delete a user
   * @param {*} id
   */
  async delete(id) {
    const result = await this.collection.deleteOne({
      _id: new mongo.ObjectId(id)
    });

    return result.deletedCount > 0;
  }

  /**
   * Delete all users
   */
  async deleteAll() {
    await this.collection.deleteMany({});
  }
}

module.exports = UserRepository;