const Review = require("../models/review.model");

class ReviewService {
  async create(payload) {
    const newReview = new Review(payload);
    await newReview.save();
    return newReview;
  }

  async find() {
    const result = await Review.find().populate("categoryId");
    console.log(result);
    return result;
  }
  async findByCategoryId(categoryId) {
    return await Review.find({ categoryId: categoryId });
  }

  async findById(id) {
    return await Review.findOne({ _id: id }).populate("categoryId");
  }

  async findByName(book) {
    return await Review.find({
      book: { $regex: new RegExp(book), $options: "i" },
    });
  }

  async update(id, update) {
    console.log(update);
    const result = await Review.findOneAndUpdate({ _id: id }, update, {
      new: true,
    });
    return result;
  }

  async delete(id) {
    const result = await Review.findOneAndDelete({
      _id: id,
    });
    return result;
  }
}
module.exports = new ReviewService();
