const mongoose = require("mongoose");
const Receita = require("../models/Receita");

module.exports = {
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
    return res.json(receita);
  },
  async getFirstIng(req, res){
    const firstIng = await Receita.aggregate(
      [
        {$match: { refeicao: req.body.refeicao, tipo: req.body.tipo }},
        {$project: { _id: 0, ingredientes: 1 } },
        {$unwind: "$ingredientes" },
        {$group: { _id: "$ingredientes.nome", count:{$sum:1}}},
        {$sort: { count: -1 } },
        {$limit : 1 }
      ]
    )
    res.json(firstIng)
  }
};