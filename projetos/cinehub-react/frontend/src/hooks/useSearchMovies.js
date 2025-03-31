import { useState, useEffect } from "react";

export function useSearchMovies(query, page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    setLoading(true);

    const fetchMovies = async () => {
      const res = await fetch(
        `http://localhost:5000/api/movies/search?query=${query}&page=${page}`
      );
      const json = await res.json();
      setData(json.results);
      setLoading(false);
    };

    fetchMovies();
  }, [query, page]);

  return { data, loading };
}
