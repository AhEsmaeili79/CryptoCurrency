import { BsCalendarDateFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { NewsDetailPropsType } from "./type";

export default function NewDetails({
  author,
  date,
  view,
}: NewsDetailPropsType) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-1 items-center">
        <FaPen className="text-gray-400 xl:block lg:hidden block" size={16} />
        <span className="text-sm text-gray-400 font-semiBold md:whitespace-normal whitespace-nowrap">
          {author}
        </span>
      </div>
      <div className="flex gap-1 items-center">
        <BsCalendarDateFill
          className="text-gray-400 xl:block lg:hidden block"
          size={16}
        />
        <span className="text-sm text-gray-400 font-semiBold">{date}</span>
      </div>
      <div className="flex gap-1 items-center">
        <HiEye className="text-gray-400 xl:block lg:hidden block" size={16} />
        <span className="text-sm text-gray-400 font-semiBold">{view}</span>
      </div>
    </div>
  );
}
