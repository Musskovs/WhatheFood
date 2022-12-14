import { createContext } from "react";
import { useState } from "react";

export const RecipeContext = createContext();

export function RecipeContextProvider({children}) {
  const [receitas, setReceitas] = useState([{}]); 
  return(
    <RecipeContext.Provider value={{receitas, setReceitas}}>
      {children}
    </RecipeContext.Provider>
  )
}