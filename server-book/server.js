const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Conectar BD
connectDB();
const app = express();

// Definir opciones antes de usarlas

const corsOptions = {
  origin: ["http://localhost:3000", "https://google-api-books-5t6n.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"], // opcional: los métodos permitidos
  credentials: true, // si necesitas enviar cookies o auth
};

app.use(cors(corsOptions));


app.use(express.json());
app.use("/comentarios", require("./routes/comentarioRoutes"));
app.use("/auth", require("./routes/authRoutes"));


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});

