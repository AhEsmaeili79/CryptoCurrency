import { AiFillEye } from "react-icons/ai";
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { img } from "@data";
import { ArticleCardInitValue } from "./initial-value";

export default function ArticleCard({ article }: ArticleCardInitValue) {
  return (
    <div className="md:p-4 p-2 rounded-xl flex flex-col md:gap-4 gap-3 items-center"
    style={{
      background: `url(${img.article_card_bg}) no-repeat center right`,
        backgroundSize: "cover",
    }}>
      <img
        src={article.img}
        alt="learning article"
        className="rounded-lg"
      />
      <span className="text-orange-primary font-bold md:text-xl text-lg block mx-auto text-center">
        {article.title}
      </span>
      <Link
        to=""
        className="md:text-base text-sm bg-blue-primary text-white py-2 rounded-md block text-center w-full"
      >
        بزن بریم
      </Link>

      <div className="flex justify-between md:gap-4 gap-2 items-center w-full md:px-4">
        <div className="text-gray-400 flex items-center">
          <PiPencilSimpleLineFill className="block ml-1" />
          <span className="md:font-semibold md:text-sm text-xs">{article.author} مقاله</span>
        </div>
        <div className="text-gray-400 flex items-center">
          <AiFillEye className="block ml-1" />
          <span className="md:font-semibold md:text-sm text-xs">{article.view} بازدید</span>
        </div>
      </div>
    </div>
  );
}
