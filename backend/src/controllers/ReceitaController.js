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
    try {
      const receita = await Receita.create(req.body);
      return res.json(receita);
    } catch (error){
      res.send(error)
    }
  },

  async getFirstIng(req, res){
    const ingWithCount = await Receita.aggregate(
      [
        {$match: { refeicao: req.body.refeicao, tipo: req.body.tipo }},
        {$project: { _id: 0, ingredientes: 1 } },
        {$unwind: "$ingredientes" },
        {$group: { _id: "$ingredientes.nome", count:{$sum:1}}},
        {$sort: { count: -1 } },
        {$limit : 1 }
      ]
    );

    const firstIng = ingWithCount[0]._id;

    res.json(firstIng);
  },

  async getNextIng(req, res){

    const ingList = await Receita.aggregate(
      [
        {$match: { refeicao: req.body.refeicao, tipo: req.body.tipo }},
        {$project: { _id: 0, ingredientes: 1 } }
      ]
    );

    var validIngredients = [];
    var i = 0;

    while (i < ingList.length) {
      var isValid;
      for (let ingrediente of ingList[i].ingredientes) {
        if (req.body.ingDisponiveis.includes(ingrediente.nome) || req.body.ingDisponiveis.length === 0) {
          isValid = true;
        }

        if (req.body.ingNaoDisponiveis.includes(ingrediente.nome)) {
          isValid = false;
          break;
        }
      };

      if (isValid){
        for (let ingrediente of ingList[i].ingredientes) {
          if (!req.body.ingDisponiveis.includes(ingrediente.nome)) {
            validIngredients.push(ingrediente.nome)
            isValid = false;
          }
        };
      }
      i += 1;
    }

    var ingCount = [];
    var nextIng = "";

    const filteredValidIngredients = validIngredients.filter(function(e) { return ! req.body.ingDisponiveis.includes(e) });
    if (filteredValidIngredients.length > 0){
      ingCount = filteredValidIngredients.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
      if (Object.keys(ingCount).length > 0) {
        nextIng = Object.keys(ingCount).reduce((a, b) => ingCount[a] > ingCount[b] ? a : b);
      }
    }
    res.json(nextIng);
  },

  async getRecipes(req, res){
    const auxRecipes = await Receita.find({refeicao: req.body.refeicao, tipo: req.body.tipo });

    var validRecipes = [];

    for (let i=0; i < auxRecipes.length; i++) {
      var isValid = false;
      for (let ingrediente of auxRecipes[i].ingredientes) {
        if (req.body.ingNaoDisponiveis.includes(ingrediente.nome)) {
          isValid = false;
          break;
        }
        if (req.body.ingDisponiveis.includes(ingrediente.nome)) {
          isValid = true;
        }
      };

      if (isValid){
        validRecipes.push(auxRecipes[i])
      }
    };

    res.json(validRecipes);
  }

};