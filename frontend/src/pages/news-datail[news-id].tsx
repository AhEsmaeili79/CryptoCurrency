import NewsCommentForm from "@common/form/news-comment/inedex";
import { static_data } from "@data";
import BreadCrumbs from "@pagesComp/news-detail/bread-crumbs";
import NewDetails from "@pagesComp/news-detail/details";
import ImagePreview from "@pagesComp/news-detail/image";
import { useParams } from "react-router-dom";

export default function NewsDetail() {
  const { id } = useParams();
  const news_data = static_data.news_data.news.find(
    (news) => news.id == id ?? null
  );

  if (!news_data) {
    return (
      <h1 className="text-red-primary text-center text-3xl mt-8 font-bold">
        صفحه مورد نظر یافت نشد
      </h1>
    );
  }

  return (
    <div className="inner-container mx-auto md:px-0 px-2 mt-8 space-y-6">
      <BreadCrumbs title={news_data?.title ?? ""} />
      <ImagePreview img={news_data.img ?? ""} />
      <h2 className="font-black text-3xl text-gray-800">{news_data.title}</h2>
      <NewDetails
        view={news_data.view}
        date={news_data.date}
        author={news_data.author}
      />
      <p className="text-gray-600 leading-loose text-justify">
        {news_data.desc}
      </p>

      <NewsCommentForm news_id={`${news_data.id} : ${news_data.title}`} />
    </div>
  );
}
