import Card from "../components/Card";
import { convertToIndonesiaTimezone } from "../utils/time";

import SkeletonCard from "../components/SkeletonCard";
import Container from "../fragment/Container";
import useResultsFetch from "../hooks/useResultsFetch";
import Page from "../components/Page";

function News() {
  const { news, handleChange, search, newsLoading, searchLoading } =
    useResultsFetch();

  if (newsLoading || searchLoading) {
    return <SkeletonCard />;
  }

  function handleChangePage() {
    console.log("change page");
  }

  return (
    <>
      <button className="bg-[#fefefe] w-64 items-center mt-5 ml-9 text-black p-3 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
        list
      </button>
      <input
        className="bg-[#fefefe] w-64 items-center mt-5 ml-9 text-black p-3 rounded shadow-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        onChange={handleChange}
        placeholder="search"
        value={search}
        type="text"
      />
      <Page onClick={handleChangePage} />
      <Container>
        <Card
          news={news}
          convertToIndonesiaTimezone={convertToIndonesiaTimezone}
        />
      </Container>
    </>
  );
}

export default News;
