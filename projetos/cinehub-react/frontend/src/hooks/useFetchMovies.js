import { useState, useEffect } from "react";

export function useFetchMovies(page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/movies/getMovies?page=${page}`
        );
        const json = await res.json();
        setData(json.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        setData([]); // Se der erro, define array vazio
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);

  return { data, loading };
}
