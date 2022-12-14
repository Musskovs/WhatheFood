import { Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import "./App.css";
import CadastroReceitas from "./feature/CadastroReceitas/CadastroReceitas";
import PaginaPrincipal from "./feature/Main/PaginaPrincipal";
import PaginaNaoEncontrada from "./feature/NotFound/PaginaNaoEncontrada";
import PaginaPerguntas from "./feature/Perguntas/PaginaPerguntas";
import PaginaReceitasRecomendadas from "./feature/ReceitasRecomendadas/PaginaReceitasRecomendadas";
import {RecipeContextProvider} from "./contexts/RecipeContext";

function App() {
  return (
    <BrowserRouter>
      <nav className="App-BarraNav">
        <NavLink to="/" exact={true} className="App-BarraNav-Link">
          Home
        </NavLink>
        <NavLink to="/cadastro-receita" className="App-BarraNav-Link">
          Cadastro de Receitas
        </NavLink>
      </nav>
      <RecipeContextProvider> 
        <Routes>
          <Route index element={<PaginaPrincipal />} />
          <Route path="cadastro-receita" element={<CadastroReceitas />} />
          <Route path="perguntas" element={<PaginaPerguntas />} />
          <Route path="receitas/recomendacoes" element={<PaginaReceitasRecomendadas />}/>
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes>
      </RecipeContextProvider>
    </BrowserRouter>
  );
}

export default App;
