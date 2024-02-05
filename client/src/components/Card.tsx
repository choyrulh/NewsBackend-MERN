import React from "react";
import { newsType } from "../type/newsType";
import { Link } from "react-router-dom";

type NewsListProps = {
  news: newsType[];
  convertToIndonesiaTimezone: (date: string) => string;
};

export const Card: React.FC<NewsListProps> = ({
  news,
  convertToIndonesiaTimezone,
}) => (
  <div className="bg-white font-[sans-serif] my-4">
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
        News
      </h2>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto ">
      {news?.map((d: newsType) => (
        <Link to={`/news/${d._id}`} key={d._id}>
          <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
            <img
              src={d.header_image}
              alt={d.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <span className="text-sm block text-gray-400 mb-2">
                {convertToIndonesiaTimezone(d.published_at)} | BY {d.author}
              </span>
              <h3 className="text-xl font-bold text-[#333]">{d.title}</h3>
              <hr className="my-6" />
              <p className="text-gray-400 text-sm">
                {d.description.slice(0, 100) ||
                  d.short_description?.slice(0, 100)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
