// Importando as dependências do projeto
const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const uri =
  "mongodb+srv://Musskopf:Manoel1234@clusterwtf.2dbyum3.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

requireDir("./src/models");

// Redireciona o caminho http://localhost:3000/api para o routes
app.use("/api", require("./src/routes/routes"));

app.listen(3000, () => {
  console.log("Server online!");
});
