// Mengimpor koneksi database
const db = require("../config/db");


// ==============================
// GET ALL MAKANAN + SEARCH
// ==============================

const getAllMakanan = (req, res) => {

  // Mengambil keyword pencarian dari URL
  const search = req.query.search;

  // Query default
  let sql = "SELECT * FROM makanan";

  let params = [];

  // Jika user melakukan pencarian
  if (search) {

    sql = "SELECT * FROM makanan WHERE nama LIKE ?";

    params.push(`%${search}%`);
  }

  db.query(sql, params, (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Gagal mengambil data",
        error: err
      });
    }

    res.json(result);

  });

};


// ==============================
// GET MAKANAN BY ID
// ==============================

const getMakananById = (req, res) => {

  const id = req.params.id;

  const sql = "SELECT * FROM makanan WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Gagal mengambil data",
        error: err
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Makanan tidak ditemukan"
      });
    }

    res.json(result[0]);

  });

};


// ==============================
// POST MAKANAN
// ==============================

const createMakanan = (req, res) => {

  const {
    nama,
    harga,
    gambar,
    kategori,
    ingredients,
    instructions
  } = req.body;

  const sql = `
    INSERT INTO makanan
    (nama, harga, gambar, kategori, ingredients, instructions)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      nama,
      harga,
      gambar,
      kategori,
      ingredients,
      instructions
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: "Gagal menambahkan makanan",
          error: err
        });
      }

      res.status(201).json({
        message: "Makanan berhasil ditambahkan",
        id: result.insertId
      });

    }
  );

};


// ==============================
// PUT MAKANAN
// ==============================

const updateMakanan = (req, res) => {

  const id = req.params.id;

  const {
    nama,
    harga,
    gambar,
    kategori,
    ingredients,
    instructions
  } = req.body;

  const sql = `
    UPDATE makanan
    SET
      nama = ?,
      harga = ?,
      gambar = ?,
      kategori = ?,
      ingredients = ?,
      instructions = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      nama,
      harga,
      gambar,
      kategori,
      ingredients,
      instructions,
      id
    ],
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Gagal update makanan",
          error: err
        });
      }

      res.json({
        message: "Makanan berhasil diupdate"
      });

    }
  );

};


// ==============================
// DELETE MAKANAN
// ==============================

const deleteMakanan = (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM makanan WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "Gagal menghapus makanan",
        error: err
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Makanan tidak ditemukan"
      });
    }

    res.json({
      message: "Makanan berhasil dihapus"
    });

  });

};


// Export semua function controller
module.exports = {
  getAllMakanan,
  getMakananById,
  createMakanan,
  updateMakanan,
  deleteMakanan
};