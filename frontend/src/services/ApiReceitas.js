import axios from "axios";

const ApiReceitas = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default ApiReceitas;