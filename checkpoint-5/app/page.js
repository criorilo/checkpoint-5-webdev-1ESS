"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import axios from "axios";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import List from "../components/List";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ sort: "title" });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchRef = useRef();

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://mockapi.io/api/v1/movies", {
        params: { q: search }
      });
      setMovies(response.data);
    } catch {
      setError("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const filteredMovies = useMemo(() => {
    if (!movies) return [];
    return [...movies].sort((a, b) => {
      if (filters.sort === "title") return a.title.localeCompare(b.title);
      if (filters.sort === "year") return b.year - a.year;
      return 0;
    });
  }, [movies, filters]);

  const handleSearchChange = useCallback((value) => setSearch(value), []);
  const handleFilterChange = useCallback((newFilters) => setFilters(newFilters), []);

  return (
    <>
      <Header/>
      <SearchBar value={search} onChange={handleSearchChange} ref={searchRef} />
      <Filters filters={filters} onChange={handleFilterChange} />
      {loading && <Loader />}
      {error && <ErrorState message={error} />}
      <List items={filteredMovies} />
    </>
  );
}
