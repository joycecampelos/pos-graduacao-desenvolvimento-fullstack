import AppRoutes from "./routes";
import { MoviesProvider } from "./context/MoviesContext";

function App() {
  return (
    <MoviesProvider>
      <AppRoutes />
    </MoviesProvider>
  );
}

export default App;
