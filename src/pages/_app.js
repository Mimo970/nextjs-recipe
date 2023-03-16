import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "../../contexts/AuthContext";
import { FavoriteRecipesProvider } from "../../contexts/FavoritesContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <FavoriteRecipesProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Component {...pageProps} />{" "}
        </ThemeProvider>
      </FavoriteRecipesProvider>
    </AuthContextProvider>
  );
}
