import React from "react";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="paginaErro">
      <h1 className="disclaimer">
        Poxa! Infelizmente não encontramos receitas que se encaixem nas suas
        necessidades.
      </h1>
      <h2 className="sugestions">
        Mas não fique com fome, peça sua comida no{" "}
        <a href="https://www.ifood.com.br/">Ifood</a>!
      </h2>
      <h2 className="sugestions">
        E se precisar comprar mais ingredientes para receitas futuras, conte com o{" "}
        <a href="https://www.sitemercado.com.br/">SiteMercado</a>!
      </h2>
    </div>
  );
};

export default ErrorPage;
