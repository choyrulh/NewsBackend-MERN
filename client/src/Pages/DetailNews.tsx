import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDetailNews } from "../service/newsApi";
import { convertToIndonesiaTimezone } from "../utils/time";

type ParamsType = {
  id: string;
};

function DetailNews() {
  const params = useParams<ParamsType>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["detailNews"],
    queryFn: () => fetchDetailNews(params.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(data);

  return (
    <div className="bg-white font-[sans-serif] my-4 p-6 rounded shadow-lg">
      <img
        src={data.header_image}
        alt={data.title}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-extrabold text-[#333] mb-4">{data.title}</h2>
      <span className="text-sm block text-gray-400 mb-6">
        {convertToIndonesiaTimezone(data.published_at)} | BY {data.author}
      </span>
      <p className="text-gray-800 text-sm leading-relaxed tracking-wide">
        {data.description}
      </p>
    </div>
  );
}

export default DetailNews;