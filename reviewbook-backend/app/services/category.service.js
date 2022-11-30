const Category = require("../models/category.model");

class CategoryService {
  async create(payload) {
    const newCategory = new Category(payload);

    await newCategory.save();

    return newCategory;
  }

  async find() {
    const result = await Category.find();
    console.log(result);
    return result;
  }

  async findByName(categoryName) {
    return await Category.find({
      categoryName: { $regex: new RegExp(categoryName), $options: "i" },
    });
  }

  async findById(id) {
    return await Category.findOne({ _id: id });
  }

  async update(id, update) {
    console.log(update);
    const result = await Category.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    return result;
  }

  async delete(id) {
    const result = await Category.findOneAndDelete({
      _id: id,
    });
    return result;
  }
}
module.exports = new CategoryService();
