import NewsCard from "./news-card";
import { NewsType } from "./type";

export default function NewsContent({ news }: any) {
  return (
    <section className="px-0 grid lg:grid-cols-2 grid-cols-1 xl:gap-12 gap-8 lg:mt-24 mt-12 pb-12">
      {news.map(({ img, title, desc, author, date, view, id }: NewsType) => (
        <NewsCard
          id={id}
          img={img}
          title={title}
          desc={desc}
          author={author}
          date={date}
          view={view}
        />
      ))}
    </section>
  );
}
