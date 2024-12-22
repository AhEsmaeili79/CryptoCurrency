import { img } from "@data";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { HiEye } from "react-icons/hi";

export default function BlogCard() {
  return (
    <div
      className="bg-white rounded-xl flex relative md:w-full w-[30rem]"
      style={{
        boxShadow:
          "11px 11px 30px -5px rgba(6, 102, 151, 0.10), -6px -6px 26px 0px rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="py-4 pr-4 xl:pl-8 p-4 flex flex-col">
        <div className="flex md:flex-row flex-col gap-4">
          <img
            src={img.blog1_img}
            alt="blog"
            className="md:w-36 w-full md:h-36 h-32 object-cover rounded-xl"
          />
          <div className="flex flex-col gap-2">
            <span className="block font-extraBold text-red-primary md:text-xl text-base">
              آموزش نوسان‌گیری در کریپتر
            </span>
            <p className="text-gray-300 text-justify leading-relaxed">
              امروزه بازار ارز دیجیتال از جذاب‌ترین بازارها برای سرمایه‌گذاری
              است. برخی افراد در این بازار سودهای زیادی را ....
            </p>

            <div className="flex gap-4 items-center justify-between mt-auto">
              <div className="flex gap-2 items-center">
                <FaPen className="text-gray-400" size={16} />
                <span className="md:text-sm text-xs md:whitespace-normal whitespace-nowrap text-gray-400 font-semiBold">
                  سید حسین یعقوبی
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <BsCalendarDateFill className="text-gray-400" size={16} />
                <span className="text-sm text-gray-400 font-semiBold">
                  ۱۴۰۲/۰۱/۱۳
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <HiEye className="text-gray-400" size={16} />
                <span className="text-sm text-gray-400 font-semiBold">245</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:h-3/4 h-[2px] m-auto lg:w-2 md:w-1 w-11/12 rounded-full bg-red-primary md:static absolute top-0 right-0 left-0"></div>
    </div>
  );
}
