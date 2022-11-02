
import { Routes, Route, BrowserRouter, NavLink } from "react-router-dom";
import './App.css';
import RecipeForm from "./feature/Recipe/RecipeForm";
import MainPage from "./feature/Main/MainPage";
import PageNotFound from "./feature/NotFound/PageNotFound";
import QuestionsPage from "./feature/Questions/QuestionsPage";

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
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="cadastro-receita" element={<RecipeForm />} />
        <Route path="perguntas" element={<QuestionsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
