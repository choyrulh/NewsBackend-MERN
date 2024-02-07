import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDetailNews } from "../service/newsApi";
import { convertToIndonesiaTimezone } from "../utils/time";
import DetailSkeleton from "../components/DetailSkeleton";

type ParamsType = {
  id: string | undefined;
};

function DetailNews() {
  const params = useParams<ParamsType>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["detailNews"],
    queryFn: () => {
      // Menangani kasus jika params.id undefined
      if (params.id) {
        return fetchDetailNews(params.id);
      } else {
        // Mengembalikan data default atau menangani kasus lainnya
        return null; /* sesuatu yang sesuai dengan kebutuhan Anda */
      }
    },
  });

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div className="bg-white font-[sans-serif] my-4 p-6 rounded shadow-lg">
      <img
        src={data.main_image}
        alt={data.title}
        className="w-full h-96 object-cover rounded mb-6"
      />
      <h2 className="text-3xl font-extrabold text-[#333] mb-4">{data.title}</h2>
      <span className="text-sm block text-gray-400 mb-6">
        {convertToIndonesiaTimezone(data.publish_date)} | BY {data.author}
      </span>
      <p className="text-gray-800 text-sm leading-relaxed tracking-wide">
        {data.article_text}
      </p>
    </div>
  );
}

export default DetailNews;
