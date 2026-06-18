// Mengimpor library mysql2 untuk menghubungkan Node.js dengan MySQL
const mysql = require("mysql2");

// Membuat koneksi ke database
const db = mysql.createConnection({
  host: "localhost",      // Server database
  user: "root",           // Username MySQL
  password: "",           // Password MySQL
  database: "carimakan"   // Nama database
});

// Melakukan koneksi ke database
db.connect((err) => {

  // Jika terjadi error
  if (err) {
    console.log("Koneksi gagal");
    console.log(err);
    return;
  }

  // Jika berhasil terhubung
  console.log("MySQL Connected");

});

// Mengekspor koneksi database agar bisa digunakan file lain
module.exports = db;