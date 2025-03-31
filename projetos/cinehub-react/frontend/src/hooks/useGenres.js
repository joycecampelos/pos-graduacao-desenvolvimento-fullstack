import { useState, useEffect } from "react";

export function useGenres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Faz a requisição ao backend
    fetch("http://localhost:5000/api/movies/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => {
        console.error("Erro ao buscar gêneros:", error);
      });
  }, []);

  return genres;
}
