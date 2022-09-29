const mongoose = require("mongoose");
const Receita = require("../models/Receita");

module.exports = {
  // Vai retornar todas as receitas de nosso banco de dados
  async index(req, res) {
    try {
      const receitas = await Receita.find();
      return res.json(receitas);
    } catch (error){
      res.send(error)
    }
  },
  async store(req, res) {
    const receita = await Receita.create(req.body);
    // Vamos retornar a receita que criamos
    return res.json(receita);
  },
};