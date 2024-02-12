import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchDetailNews } from "../service/newsApi";
import { convertToIndonesiaTimezone } from "../utils/time";

type ParamsType = {
  id: string | undefined;
};

function DetailNews() {
  const params = useParams<ParamsType>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["detailNews"],
    queryFn: () => {
      // Handle cases where params.id is undefined
      if (params.id) {
        return fetchDetailNews(params.id);
      } else {
        // Return default data or handle the case as needed
        return null; // Replace with something appropriate for your app
      }
    },
  });

  if (isLoading) {
    // Provide a loading indicator while data is fetching
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    // Display an error message if there's an error
    return <div className="text-center mt-4">Error fetching news details.</div>;
  }

  return (
    <div className="flex flex-col bg-gray-100 pt-16 pb-24 px-8 mx-auto max-w-screen-md gap-10">
      {/* Image */}
      <img
        src={data.main_image}
        alt={data.title}
        className="rounded-xl object-cover h-64 w-full"
      />

      {/* Title and Information */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold text-gray-800">{data.title}</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <span className="mr-2">
            {convertToIndonesiaTimezone(data.publish_date)}
          </span>
          <span>•</span>
          <span className="ml-2">BY {data.author}</span>
        </div>
      </div>

      {/* Article Text */}
      <p className="text-gray-700 text-base leading-relaxed">
        {data.article_text}
      </p>

      {/* Tags */}
      <p className="text-gray-500">
        Tags:{" "}
        {data.tag.map((tag) => {
          return tag.replace(/['"]+/g, "");
        })}
      </p>
    </div>
  );
}

export default DetailNews;
