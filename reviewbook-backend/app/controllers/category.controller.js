const ApiError = require("../api-error");
const CategoryService = require("../services/category.service");

exports.create = async (req, res, next) => {
  if (!req.body?.categoryName) {
    return next(new ApiError(400, "The category can not be empty"));
  }

  try {
    const document = await CategoryService.create({
      categoryName: req.body.categoryName,
    });
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the category")
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { categoryName } = req.query;
    if (categoryName) {
      documents = await CategoryService.findByName(categoryName);
    } else {
      documents = await CategoryService.find({});
    }
    console.log(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving categories")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const document = await CategoryService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Category not found"));
    }
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving category with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const document = await CategoryService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Category not found"));
    }
    return res.send({ message: "Category was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating category with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const document = await CategoryService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Category not found"));
    }
    return res.send({ message: "Category was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete category with id=${req.params.id}`)
    );
  }
};
