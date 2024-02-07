import React, { useState } from "react";
import useDebounce from "./useDebounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNews, fetchNewsByQuery } from "../service/newsApi";

function useResultsFetch() {
  const [search, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(search, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data, isLoading: searchLoading } = useQuery({
    queryKey: ["newsIndonesia", debounceSearchTerm],
    queryFn: () => fetchNewsByQuery(debounceSearchTerm || ""),
    enabled: !!debounceSearchTerm,
    staleTime: Infinity,
  });

  const newsQuery = data?.data.news;

  console.log(newsQuery);

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ["newsIndonesia"],
    queryFn: fetchNews,
    staleTime: Infinity,
  });

  console.log(newsData?.news);
  const news = newsQuery || newsData?.news;
  return {
    news,
    handleChange,
    search,
    newsLoading,
    searchLoading,
  };
}

export default useResultsFetch;
