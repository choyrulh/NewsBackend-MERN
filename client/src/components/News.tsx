import { useQuery } from "@tanstack/react-query";
import { newsType } from "./../type/newsType";
import { convertToIndonesiaTimezone } from "./../utils/time";
import { fetchNews } from "../service/newsApi";
import SkeleteonCard from "./SkeleteonCard";
import { Card } from "./Card";

function News() {
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  if (isLoading) {
    return <SkeleteonCard />;
  }

  const news = data?.news;

  console.log(news);
  return (
    // <h1>Hello</h1>
    <>
      <Card
        news={news}
        convertToIndonesiaTimezone={convertToIndonesiaTimezone}
      />
    </>
  );
}

export default News;
