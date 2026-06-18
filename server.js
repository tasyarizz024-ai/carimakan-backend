// Mengimpor framework Express
const express = require("express");

// Menjalankan koneksi database
require("./config/db");

// Membuat instance Express
const app = express();

// Mengimpor route makanan
const makananRoutes = require("./routes/makananRoutes");

// Middleware untuk membaca JSON
app.use(express.json());

// Route utama untuk mengecek server
app.get("/", (req, res) => {
  res.send("Backend CariMakan Berjalan!");
});

// Menghubungkan endpoint makanan
app.use("/api/makanan", makananRoutes);

// Menjalankan server pada port 5000
app.listen(5000, () => {
  console.log("Server berjalan di port 5000");
});