import axios from "axios";

const RecipesApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

export default RecipesApi;