import { useQuery } from "@tanstack/react-query";
import { fetchNews, fetchNewsByQuery } from "../service/newsApi";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { convertToIndonesiaTimezone } from "../utils/time";

import SkeletonCard from "../components/SkeletonCard";

function News() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, []);

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ["news", debounceSearchTerm],
    queryFn: () => fetchNewsByQuery(debounceSearchTerm || ""),
    enabled: !!debounceSearchTerm,
    staleTime: Infinity,
  });
  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: Infinity,
  });

  if (searchLoading || newsLoading) {
    return <SkeletonCard />;
  }

  const resultsQuery = debounceSearchTerm
    ? searchData?.data.news
    : newsData?.news;

  console.log(resultsQuery);

  return (
    <>
      <input
        className="bg-[#fefefe] w-64 items-center mt-5 ml-9 text-black p-3 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        onChange={handleChange}
        placeholder="search"
        value={searchTerm}
        type="text"
      />
      <Card
        news={resultsQuery}
        convertToIndonesiaTimezone={convertToIndonesiaTimezone}
      />
    </>
  );
}

export default News;
