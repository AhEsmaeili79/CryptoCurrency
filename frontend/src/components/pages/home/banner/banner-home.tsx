import { img } from "@data";
import { FaArrowDownLong } from "react-icons/fa6";

export default function HomeBanner() {
  return (
    <div
      className="header__banner"
      style={{
        background: `url(${img.banner_home_bg}) no-repeat center bottom`,
        backgroundSize: "cover",
      }}
    >
      <div className="inner-container mx-auto flex md:flex-row flex-col-reverse md:justify-between items-center md:px-0 px-2">
        <ContentTitle />
        <img
          src={img.banner_home_wallet}
          alt="wallet"
          className="xl:w-fit lg:w-96 md:w-80 w-56 mr-auto"
        />
      </div>
      <a href="#online-prices" className="absolute bottom-0 mx-auto left-0 right-0 w-fit px-8 py-2">
        <span className="rounded-full block text-gray-400">
          <FaArrowDownLong size={24} />
        </span>
      </a>
    </div>
  );
}

const ContentTitle = () => {
  return (
    <div className="mt-20 ml-auto">
      <span className="bg-yellow-primary block w-max-content h-[6px] rounded-full"></span>
      <span className="text-white mt-2 md:text-2xl text-xl block">
        با دعوت از دوستانتان به معامله در
      </span>
      <div className="text-yellow-primary md:text-6xl text-4xl mt-2">
        <span className="font-extraBold">
          <span className="font-extraBold">کــــــریـــپتر</span>
        </span>
        <span className=""> 30% </span>
      </div>
      <span className="block text-white md:text-[1.6rem] text-base mt-4">
        کارمزد ما در جیب شما
      </span>
      <span className="font-light block text-white mt-1 md:text-base text-sm">
        مطمئن‌ترین ارز دیجیتال در ایران
      </span>
      <a
        href="#online-calulator"
        className="block px-4 w-fit  md:text-base text-sm border-2 border-yellow-primary py-2 rounded-xl text-yellow-primary font-extraBold mt-8"
      >
        بزن بریم برای دریافت جایزه
      </a>
    </div>
  );
};
