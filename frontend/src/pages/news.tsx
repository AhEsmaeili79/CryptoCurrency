import TitlePage from "@common/titles/page";
import { static_data } from "@data";
import BannerNews from "@pagesComp/news/banner/banner-news";
import InputFilter from "@pagesComp/news/input/input-filter";
import NewsContent from "@pagesComp/news/news-content/news";
import { useState } from "react";

export default function NewsPage() {
  const [filteredNews, setFilteredNews] = useState<
    [] | static_data.news_init_type.NewsInitType
  >([]);

  return (
    <>
      <BannerNews />
      <div className="inner-container mx-auto md:px-0 px-2">
        <section className="grid md:grid-cols-2 gap-8 mt-20 items-center">
          <TitlePage />
          <InputFilter setFilteredNews={setFilteredNews} />
        </section>
        <NewsContent
          news={filteredNews.length ? filteredNews : static_data.news_data.news}
        />
      </div>
    </>
  );
}
