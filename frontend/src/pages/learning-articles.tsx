import SafeExchange from "@pagesComp/home/content/safe-exchange";
import Articles from "@pagesComp/learning-articles/articles";
import BannerLearningArticles from "@pagesComp/learning-articles/banner";

export default function LearningArticlesPage() {
  return (
    <>
      <BannerLearningArticles />
      <div className="inner-container mx-auto md:px-0 px-2">
        <Articles />
        <SafeExchange />
      </div>
    </>
  );
}
