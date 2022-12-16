import React from "react";
import { useContext } from "react";
import { RecipeContext } from "../../contexts/RecipeContext";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";
import "./PaginaReceitasRecomendadas.css";

export default function PaginaReceitasRecomendadas() {
  const { receitas } = useContext(RecipeContext);

  console.log(receitas.map((x) => x.titulo));
  return (
    <div className="recipePage">
      {receitas?.map((receita) => (
          <Card key={receita._id} className="card">
            <CardActionArea className="cardActionArea">
              <CardContent className="cardContent">
                <Typography gutterBottom variant="h4" component="div" className="titulos">
                  {receita?.titulo}
                </Typography>
                <Typography variant="body3" className="titulos">
                  Ingredientes
                </Typography>
                <Typography variant="body2" className="ingredientes">
                  <ul>
                    {receita?.ingredientes?.map((ingrediente) => (
                      <li key={ingrediente._id}> {ingrediente.nome} </li>
                    ))}
                  </ul>
                </Typography>
                <Typography variant="body3" className="titulos">
                  Instruções
                </Typography>
                <Typography variant="body2" className="instrucoes">
                  {receita?.instrucoes}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
      ))}
    </div>
  );
}
