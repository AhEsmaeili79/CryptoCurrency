import NewsSection from "@pagesComp/home/news/index";
import FrequentQuestions from "@common/accordion/frequent-questions";
import Blogs from "@common/blogs";
import CryptoMarketCards from "@common/cards/card-crypto-market";
import HomeBanner from "@pagesComp/home/banner/banner-home";
import BannerWhyCrypto from "@pagesComp/home/banner/banner-why-crypto";
import OnlineCalculator from "@pagesComp/home/calculator/onlineCalculator";
import CryptoContent from "@pagesComp/home/content/crypto-content";
import DigitalWallet from "@pagesComp/home/content/digital-wallet";
import SafeExchange from "@pagesComp/home/content/safe-exchange";
import Warning from "@pagesComp/home/content/warning";
import OnlinePrices from "@pagesComp/home/online-prices";

export default function HomePage() {
  return (
    <>
      <HomeBanner />
      <div className="inner-container mx-auto md:px-0 px-2">
      <CryptoMarketCards />
      <OnlinePrices />
      <BannerWhyCrypto />
      <OnlineCalculator />
      <CryptoContent />
      <Blogs />
      <DigitalWallet />
      <Warning />
      <NewsSection />
      <SafeExchange />
      <FrequentQuestions />
      </div>
    </>
  );
}
