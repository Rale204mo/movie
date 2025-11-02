import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const API_BASE = process.env.REACT_APP_API_BASE;

  // Fetch trending movies initially
  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/movie/popular`, {
        params: { api_key: API_KEY, language: "en-US" },
      });
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error loading movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return fetchPopular();

    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/search/movie`, {
        params: { api_key: API_KEY, query, language: "en-US" },
      });
      setMovies(res.data.results);
    } catch (err) {
      console.error("Error searching:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-light mt-4">
      <h2 className="mb-3">🎬 Movie Explorer</h2>

      {/* 🔍 Search bar */}
      <form onSubmit={searchMovies} className="mb-4 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-light">Search</button>
      </form>

      {loading ? (
        <p>Loading movies...</p>
      ) : movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="row">
          {movies.map((m) => (
            <div className="col-md-3 mb-4" key={m.id}>
              <div className="card bg-dark text-light h-100 shadow-sm">
                <Link to={`/movie/${m.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {m.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                      className="card-img-top"
                      alt={m.title}
                    />
                  ) : (
                    <div className="p-4 text-center">No Image</div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{m.title}</h5>
                    <p className="card-text small">
                      ⭐ {m.vote_average} | {m.release_date?.slice(0, 4)}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
