const express = require("express");
const routes = express.Router();

const ReceitaController = require("../controllers/ReceitaController");

// Receitas
routes.get("/receitas", ReceitaController.index);
routes.post("/receitas/inserir", ReceitaController.store);
routes.post("/receitas/ing-1", ReceitaController.getFirstIng);
routes.post("/receitas/next_ing", ReceitaController.getNextIng);
routes.post("/receitas/receitas_recomendadas", ReceitaController.getRecipes);

module.exports = routes;