import { img } from "@data";

export default function BannerLearningArticles() {
  return (
    <div className="bg-blue-50 header__banner">
      <div className="inner-container mx-auto flex md:flex-row flex-col-reverse md:justify-between items-center md:px-0 px-2">
        <img
          src={img.learning_articles_banner}
          alt="wallet"
          className="lg:w-fit w-[30rem] mx-auto mt-20"
        />
      </div>
      <div className="text-center relative gap-4">
        <h1 className="text-red-700 lg:font-bold font-black lg:text-7xl text-3xl">
          کـــــــــــریـپـتـر
        </h1>
        <div className="flex items-center justify-center gap-16 mt-2">
          <span className="font-semiBold lg:text-2xl text-xl text-blue-primary">
            بهترین مقالات را در
          </span>
          <span className="font-semiBold lg:text-2xl text-xl text-blue-primary">
            بــــــــــــــــــخوانــیــــد
          </span>
        </div>
      </div>
      <button className="absolute lg:-bottom-14 md:-bottom-10 -bottom-9 mx-auto left-0 right-0 w-fit px-8 py-2">
        <img
          src={img.arrow_down_blue}
          alt="wallet"
          className="md:w-16 w-12"
        />
      </button>
    </div>
  );
}
