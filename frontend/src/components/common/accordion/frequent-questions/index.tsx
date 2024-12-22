import SectionsTitle from "@common/titles/section";
import { img } from "@data";
import Accordion from "..";
import { Link } from "react-router-dom";

export default function FrequentQuestions() {
  const accordionData = [
    {
      title: "چگونه با موبایل ارز دیجیتال بخریم؟",
      content: "کارگزاری، شرکتی است که خریدوفروش سرمایه‌گذاری‌هایی مانند سهام، اوراق قرضه و صندوق‌های سرمایه‌گذاری را تسهیل می‌کند. تعدادی از بهترین کارگزاران سهام در حال حاضر معاملات ارز‌های دیجیتال را از طریق پلتفرم‌های خود ارائه می‌دهند. برای خرید رمزارز از کارگزاری‌ها می‌توانید از روش‌های مختلفی مانند مبتنی بر دسکتاپ، مبتنی بر برنامه یا هر دو استفاده کنید.",
    },
    {
      title: "آیا کسب درآمد ارز دیجیتال بدون سرمایه اولیه امکان پذیر است؟",
      content:
        "تمام کاربران کریپتر می توانند با استفاده از لینک اختصاصی معرفی خود، اقدام به جذب کاربران جدید نموده و برای همیشه 40% از کارمزد حاصل از تمامی معاملات ایشان را از کریپتر دریافت کنند. همچنین برای کسانی که از طریق این لینک ریفرال ثبت نام می کنند هم بر روی کارمزد معاملات خود برای همیشه 10% تخفیف خواهند داشت.",
    },
    {
      title: "امکان خرید دلار دیجیتال (تتر) در کریپتر فراهم است؟",
      content: "با اطمینان خاطر فراوان در پلتفرم امن کریپتر اقدام به معامله و خرید ارز دیجیتال نمایید. پلتفرم ترید حرفه ای ما و همچنین پلتفرم دمو ترید (حساب دمو) به همراه کیف پول (والت) اختصاصی با امکان واریز و برداشت انواع کوین و توکن ها بدون واسطه، با قیمت واقعی از خرید و فروش بیت کوین و ارزهای دیجیتال و همچنین خرید و فروش سریع و آسان در بازارهای تومان و دلار (تتر) را با کریپتر تجربه کنید.",
    },
  ];
  return (
    <div
      className="px-8 lg:mt-24 mt-12 pb-12 md:pt-24 pt-8 md:w-full w-[95%] mx-auto md:rounded-none rounded-3xl"
      style={{
        background: `url(${img.crypto_market_bg}) no-repeat center top`,
        backgroundSize: "cover",
      }}
    >
      <section>
        {/* Title Section*/}
        <SectionsTitle number={8} title="متداول" subTitle="سوالات">
          <Link to="/contact-us" className="bg-red-700 rounded-lg py-2 px-4 h-fit md:text-sm text-xs font-semiBold text-white">
            بیشتر ...
          </Link>
        </SectionsTitle>
        {accordionData.map(({ content, title }) => (
          <Accordion key={title} title={title} content={content} />
        ))}
      </section>
    </div>
  );
}
