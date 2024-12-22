import SectionsTitle from "@common/titles/section";
import { img, static_data } from "@data";
import NewsCard from "@pagesComp/news/news-content/news-card";
import { NewsType } from "@pagesComp/news/news-content/type";
import { Link } from "react-router-dom";

export default function NewsSection() {
  return (
    <div
      className="lg:mt-24 mt-12 pb-12 lg:px-8 md:px-4 px-2"
      style={{
        background: `url(${img.crypto_market_bg}) no-repeat center right`,
        backgroundSize: "contain",
      }}
    >
      <section>
        {/* Title Section*/}
        <SectionsTitle number={7} title="اخبار" subTitle="آخرین">
          <Link
            to="/news"
            className="bg-red-700 rounded-lg py-2 px-4 h-fit md:text-sm text-xs font-semiBold text-white"
          >
            بیشتر ...
          </Link>
        </SectionsTitle>
        {/* End Title Section*/}

        {/* Cards */}
        <section className="md:grid lg:grid-cols-2 md:grid-cols-1 flex overflow-x-auto lg:pb-0 pb-4 xl:gap-12 lg:gap-8 gap-4">
          {static_data.news_data.news
            .slice(0, 2)
            .map(({ img, title, desc, author, date, view, id }: NewsType) => (
              <NewsCard
                id={id}
                key={title}
                img={img}
                title={title}
                desc={desc}
                author={author}
                date={date}
                view={view}
              />
            ))}
        </section>
      </section>
    </div>
  );
}
