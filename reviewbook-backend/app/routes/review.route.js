const express = require("express");
const reviews = require("../controllers/review.controller");

const router = express.Router();

router.route("/category/:categoryId").get(reviews.findByCategoryId);

router
  .route("/:id")
  .get(reviews.findById)
  .put(reviews.update)
  .delete(reviews.delete);

router.route("/").get(reviews.findAll).post(reviews.create);

module.exports = router;
