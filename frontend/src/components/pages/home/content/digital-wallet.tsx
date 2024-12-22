import SectionsTitle from "@common/titles/section";
import { img } from "@data";

export default function DigitalWallet() {
  return (
    <div
      className="lg:mt-24 mt-12 pt-12 pb-12 lg:px-8 md:px-4 px-2"
      style={{
        background: `url(${img.crypto_market_bg}) no-repeat center right`,
        backgroundSize: "cover",
      }}
    >
      <section>
        <SectionsTitle number={6} title="دیجیتال چیست؟" subTitle="کیف پول" />

        <div
          className="bg-gray-50 px-8 md:pt-12 pt-8 pb-8 rounded-xl relative mt-8"
          style={{
            boxShadow:
              "4px 4px 22px 0px rgba(0, 0, 0, 0.15), -8px -10px 38px 0px #FFF, 7px 8px 16px -2px rgba(0, 0, 0, 0.04) inset, -4px -4px 16px 0px rgba(255, 255, 255, 0.76) inset",
          }}
        >
          <img
            src={img.digital_wallet_title}
            alt="logo"
            className="mx-auto absolute md:-top-4 -top-2 right-0 left-0 md:w-auto w-40"
          />
          <p className="text-gray-400 font-semiBold leading-loose text-justify">
            در صرافی ارز دیجیتال کریپتر که امن ترین صرافی کریپتوکارنسی
            (Cryptocurrency) کشور است، شما توانایی خرید و فروش انواع ارزهای
            دیجیتال معتبر دنیا مانند بیت کوین، اتریوم، تتر، دوج کوین، شیبا و ...
            را به صورت حرفه ای و سریع را خواهید داشت. با اطمینان خاطر فراوان در
            صرافی امن اکسیر اقدام به معامله و خرید ارز دیجیتال نمایید. پلتفرم
            ترید حرفه ای ما و همچنین پلتفرم دمو ترید (حساب دمو) به همراه کیف پول
            (والت) اخت2صاصی با امکان واریز و برداشت انواع کوین و توکن ها بدون
            واسطه، با قیمت واقعی از خرید و فروش بیت کوین و ارزهای دیجیتال و
            همچنین خرید و فروش سریع و آسان در بازارهای تومان و دلار (تتر) را با
            اکسیر تجربه کنید.
          </p>
        </div>
      </section>
    </div>
  );
}
