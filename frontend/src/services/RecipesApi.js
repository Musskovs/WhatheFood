import axios from "axios";

const RecipesApi = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default RecipesApi;