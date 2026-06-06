const Book = require("../models/book");

/* ========================================= */
/* HELPER: NORMALIZE BOOK */
/* ========================================= */

const normalizeBook = (book) => {
  if (!book) return book;

  return {
    ...book._doc,
    category: book.category?.trim().toLowerCase()
  };
};

/* ========================================= */
/* GET ALL BOOKS */
/* ========================================= */

const getBooks = async (req, res) => {
  try {
    let books = await Book.find();

    // ✅ normalize output to avoid duplicates in frontend
    books = books.map(normalizeBook);

    res.json({
      success: true,
      books
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ========================================= */
/* GET BOOK BY ID */
/* ========================================= */

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.json({
      success: true,
      book: normalizeBook(book)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ========================================= */
/* ADD BOOK (CLEAN CATEGORY) */
/* ========================================= */

const addBook = async (req, res) => {
  try {

    // ✅ CLEAN CATEGORY BEFORE SAVE
    if (req.body.category) {
      req.body.category = req.body.category.trim().toLowerCase();
    }

    const newBook = new Book(req.body);
    const savedBook = await newBook.save();

    res.status(201).json({
      success: true,
      book: normalizeBook(savedBook)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ========================================= */
/* UPDATE BOOK (CLEAN CATEGORY) */
/* ========================================= */

const updateBook = async (req, res) => {
  try {

    // ✅ CLEAN CATEGORY BEFORE UPDATE
    if (req.body.category) {
      req.body.category = req.body.category.trim().toLowerCase();
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // ✅ better than returnDocument
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book: normalizeBook(updatedBook)
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ========================================= */
/* DELETE BOOK */
/* ========================================= */

const deleteBook = async (req, res) => {
  try {

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ========================================= */
/* EXPORTS */
/* ========================================= */

module.exports = {
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};