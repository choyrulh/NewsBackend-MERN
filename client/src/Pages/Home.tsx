import { useState } from "react";
import Card from "../elements/Card";
import { convertToIndonesiaTimezone } from "../utils/time";
import useDebounce from "../hooks/useDebounce";
import {
  useGetAllNewsQuery,
  useGetNewsByPageQuery,
  useGetNewsByQueryQuery,
} from "../store/features/NewsAPI/api";
import Container from "../fragment/Container";
import SkeletonCard from "../components/SkeletonCard";
import { useParams } from "react-router-dom";
import NavPagination from "../components/NavPagination";

function Home() {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const debounceSearchTerm = useDebounce(search, 500);
  const { data: dataAll, isLoading: isLoadingAll } = useGetAllNewsQuery("");
  const { data: dataQuery, isLoading: isLoadingQuery } =
    useGetNewsByQueryQuery(debounceSearchTerm);
  const { data: dataPagination } = useGetNewsByPageQuery(id);

  const currentPage = id ? Math.max(2, parseInt(id)) : 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const newsQuery = dataQuery?.data.news;
  const newsAll = dataAll?.data.news;

  let news;

  if (search.length > 2) {
    news = newsQuery;
  } else if (id) {
    news = dataPagination?.data.news;
  } else {
    news = newsAll;
  }

  if (isLoadingAll === true || isLoadingQuery === true) {
    return <SkeletonCard />;
  }

  return (
    <>
      <input
        className="bg-[#fefefe] w-64 items-center mt-5 ml-9 text-black p-3 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        placeholder="Search..."
        onChange={handleChange}
        value={search}
      />
      <NavPagination currentPage={currentPage} />
      <Container>
        <Card
          news={news}
          convertToIndonesiaTimezone={convertToIndonesiaTimezone}
        />
      </Container>
    </>
  );
}

export default Home;
