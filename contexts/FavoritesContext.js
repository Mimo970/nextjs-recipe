import { createContext, useContext, useState } from "react";

// Create the context
export const FavoriteRecipesContext = createContext();

// Custom hook to use the context
// export const useFavoriteRecipes = () => {
//   const context = useContext(FavoriteRecipesContext);
//   if (!context) {
//     throw new Error(
//       "useFavoriteRecipes must be used within a FavoriteRecipesProvider"
//     );
//   }
//   return context;
// };

// Provider component to wrap your app with
export const FavoriteRecipesProvider = ({ children }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const toggleFavoriteRecipe = (recipe) => {
    if (favoriteRecipes.find((r) => r.id === recipe.id)) {
      setFavoriteRecipes(favoriteRecipes.filter((r) => r.id !== recipe.id));
    } else {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    }
  };

  return (
    <FavoriteRecipesContext.Provider
      value={{ favoriteRecipes, setFavoriteRecipes, toggleFavoriteRecipe }}
    >
      {children}
    </FavoriteRecipesContext.Provider>
  );
};
