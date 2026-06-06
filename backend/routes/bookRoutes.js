const express = require("express");

const router = express.Router();

const {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");


/* ========================================= */
/* GET ALL BOOKS */
/* ========================================= */

router.get("/", getBooks);


/* ========================================= */
/* GET SINGLE BOOK */
/* ========================================= */

router.get("/:id", getBookById);


/* ========================================= */
/* ADD BOOK */
/* ========================================= */

router.post("/add", addBook);


/* ========================================= */
/* UPDATE BOOK */
/* ========================================= */

router.put("/update/:id", updateBook);


/* ========================================= */
/* DELETE BOOK */
/* ========================================= */

router.delete("/delete/:id", deleteBook);


module.exports = router;