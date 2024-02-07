import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNewsByQuery } from "../service/newsApi";
import Card from "../components/Card";
import { convertToIndonesiaTimezone } from "../utils/time";
import useDebounce from "../hooks/useDebounce";

function Home() {
  const [search, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(search, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { data } = useQuery({
    queryKey: ["newsIndonesia", debounceSearchTerm],
    queryFn: () => fetchNewsByQuery(debounceSearchTerm || ""),
    enabled: !!debounceSearchTerm,
    staleTime: Infinity,
  });

  const news = data?.data.news;

  console.log(news);
  return (
    <>
      <input
        className="bg-[#fefefe] w-64 items-center mt-5 ml-9 text-black p-3 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        placeholder="Search..."
        onChange={handleChange}
        value={search}
      />
      <Card
        news={news}
        convertToIndonesiaTimezone={convertToIndonesiaTimezone}
      />
    </>
  );
}

export default Home;
