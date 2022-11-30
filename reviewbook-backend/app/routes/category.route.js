const express = require("express");
const categories = require("../controllers/category.controller");

const router = express.Router();

router
  .route("/:id")
  .get(categories.findOne)
  .put(categories.update)
  .delete(categories.delete);
router.route("/").get(categories.findAll).post(categories.create);

module.exports = router;
