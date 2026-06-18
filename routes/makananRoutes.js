// Mengimpor Express
const express = require("express");

const router = express.Router();

// Mengimpor seluruh controller
const {
  getAllMakanan,
  getMakananById,
  createMakanan,
  updateMakanan,
  deleteMakanan
} = require("../controllers/makananController");


// Menampilkan semua makanan + fitur search
router.get("/", getAllMakanan);

// Menampilkan detail makanan berdasarkan ID
router.get("/:id", getMakananById);

// Menambahkan makanan baru
router.post("/", createMakanan);

// Mengubah data makanan
router.put("/:id", updateMakanan);

// Menghapus makanan
router.delete("/:id", deleteMakanan);


// Export router
module.exports = router;