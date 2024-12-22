import { img, static_data } from "@data";
import ArticleCard from "./card/card";

export default function Articles() {
  return (
    <div className="lg:mt-24 mt-12 pb-12">
      {/* Title Section*/}
      <section className="mx-auto bg-blue-primary md:p-8 p-4 rounded-xl">
        <h1 className="text-white text-center flex justify-center items-center">
          <span className="text-3xl block ml-2">مقالات</span>
          <img src={img.logo_white} alt="logo" />
        </h1>
        {/* End Title Section*/}

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-4 mt-12">
          {static_data.learning_articles.map((article) => (
            <ArticleCard article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
