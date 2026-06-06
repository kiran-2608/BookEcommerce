const mongoose = require("mongoose");
const Book = require("../models/book");

// 🔗 replace with your MongoDB URI
const MONGO_URI = "mongodb://localhost:27017/yourDB";

async function cleanCategories() {
  try {
    await mongoose.connect(MONGO_URI);

    const books = await Book.find();

    for (let book of books) {
      if (book.category) {
        book.category = book.category.trim().toLowerCase();
        await book.save();
      }
    }

    console.log("✅ Categories cleaned successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
}

cleanCategories();