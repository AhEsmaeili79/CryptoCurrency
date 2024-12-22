import { BsCalendarDateFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";

interface PropsType {
  id: string;
  img: string;
  title: string;
  desc: string;
  author: string;
  date: string;
  view: number;
}

export default function NewsCard(props: PropsType) {
  const { img, title, desc, author, date, view, id } = props;
  return (
    <div
      className="bg-white rounded-xl flex relative"
      style={{
        boxShadow:
          "11px 11px 30px -5px rgba(6, 102, 151, 0.10), -6px -6px 26px 0px rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="p-4 flex flex-col">
        <div className="md:grid grid-cols-8 flex flex-col gap-4">
          <div className="md:col-span-3 relative">
            <img
              src={img ?? img}
              alt={title}
              className="md:h-36 h-28 w-full object-cover rounded-xl "
            />
            <Link
              to={`/news/detail/${id}`}
              className="absolute -mt-8 text-xs left-2 bg-blue-primary text-white px-2 py-1 rounded-md"
            >
              مشاهده بیشتر
            </Link>
          </div>

          <div className="md:col-span-5 flex flex-col gap-2">
            <span className="block font-extraBold text-red-primary md:text-xl text-base">
              {title}
            </span>
            <p className="text-gray-400 font-semiBold text-justify md:text-base text-sm line-clamp-3">
              {desc}
            </p>

            <div className="w-full flex gap-4 items-center justify-between mt-auto">
              <div className="flex gap-1 items-center">
                <FaPen
                  className="text-gray-400 xl:block lg:hidden block"
                  size={16}
                />
                <span className="text-sm text-gray-400 font-semiBold md:whitespace-normal whitespace-nowrap">
                  {author}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <BsCalendarDateFill
                  className="text-gray-400 xl:block lg:hidden block"
                  size={16}
                />
                <span className="text-sm text-gray-400 font-semiBold">
                  {date}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <HiEye
                  className="text-gray-400 xl:block lg:hidden block"
                  size={16}
                />
                <span className="text-sm text-gray-400 font-semiBold">
                  {view}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 h-[2px] m-auto rounded-full bg-red-primary absolute top-0 right-0 left-0"></div>
    </div>
  );
}
