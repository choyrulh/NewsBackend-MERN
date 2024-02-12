import React, { memo } from "react";
import { newsType } from "../type/newsType";
import { Link } from "react-router-dom";

type NewsListProps = {
  news: newsType[];
  convertToIndonesiaTimezone: (date: string) => string;
};

const Card: React.FC<NewsListProps> = ({
  news,
  convertToIndonesiaTimezone,
}) => (
  <>
    {news?.length === 0 && (
      <div className="mt-10 text-center items-center justify-center text-gray-500">
        Not found item
      </div>
    )}
    {news?.map((d: newsType) => (
      <Link to={`/news/${d._id}`} key={d._id}>
        <div className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
          <img
            src={d.main_image}
            alt={d.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-6">
            <span className="text-sm block text-gray-400 mb-2">
              {convertToIndonesiaTimezone(d.publish_date)} | oleh {d.author}
            </span>
            <h3 className="text-xl font-bold text-[#333]">{d.title}</h3>
            <hr className="my-6" />
            <p className="text-gray-400 text-sm">
              {d.article_text?.slice(0, 100)}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </>
);

export default memo(Card);
