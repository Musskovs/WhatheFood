const express = require("express");
const routes = express.Router();

const ReceitaController = require("../controllers/ReceitaController");

// Receitas
routes.get("/receitas", ReceitaController.index);
routes.post("/receitas/inserir", ReceitaController.store);
routes.post("/receitas/ing-1", ReceitaController.getFirstIng);

module.exports = routes;