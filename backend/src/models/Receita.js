// Importar módulos necessários
const mongoose = require("mongoose");

const ingredientesSchema = new mongoose.Schema({ nome: String });

const ReceitaSchema = new mongoose.Schema(
  {
    titulo: {
        type: String,
        required: true,
    },
    refeicao: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    ingredientes: {
        type: [ingredientesSchema],
        required: true,
    },
    instrucoes: {
        type: String,
        required: true,
    },
  },
);

module.exports = mongoose.model("Receita", ReceitaSchema);