const ApiError = require("../api-error");
const ReviewService = require("../services/review.service");

exports.create = async (req, res, next) => {
  if (!req.body?.book) {
    return next(new ApiError(400, "The book can not be empty"));
  }

  try {
    const document = await ReviewService.create({
      book: req.body.book,
      author: req.body.author,
      categoryId: req.body.categoryId,
      content: req.body.content,
    });
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the review")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { book } = req.query;
    if (book) {
      documents = await ReviewService.findByName(book);
    } else {
      documents = await ReviewService.find({});
    }
    console.log(documents);
  } catch (error) {
    return next(
      console.log(error),
      new ApiError(500, "An error occurred while retrieving reviews")
    );
  }

  return res.send(documents);
};

exports.findByCategoryId = async (req, res, next) => {
  try {
    const document = await ReviewService.findByCategoryId(
      req.params.categoryId
    );
    if (!document) {
      return next(new ApiError(404, "Review not found"));
    }
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving review with id=${req.params.id}`)
    );
  }
};

exports.findById = async (req, res, next) => {
  try {
    const document = await ReviewService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Review not found"));
    }
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving review with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const document = await ReviewService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Review not found"));
    }
    return res.send({ message: "Review was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating review with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const document = await ReviewService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Review not found"));
    }
    return res.send({ message: "Review was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete review with id=${req.params.id}`)
    );
  }
};
