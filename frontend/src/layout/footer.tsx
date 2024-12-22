import { img } from "@data";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="inner-container mx-auto mt-8 rounded-2xl bg-blue-primary p-8 text-white mb-4"
      style={{ backgroundImage: `url(${img.footer_bg})` }}
    >
      {/* ___________________ خبرنامه  ___________________ */}
      <NewsLetter />

      {/* ___________________ درباره کریپتر  ___________________ */}
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-8">
        <div>
          <img src={img.logo_white} alt="logo" className="w-20" />
          <p className="mt-2 text-justify leading-relaxed ">
            در صرافی ارز دیجیتال کریپتر که امن ترین صرافی کریپتوکارنسی
            (Cryptocurrency) کشور است، شما توانایی خرید و فروش انواع ارزهای
            دیجیتال معتبر دنیا مانند بیت کوین، اتریوم، تتر، دوج کوین، شیبا و ...
            را به صورت حرفه ای و سریع را خواهید داشت.با اطمینان خاطر فراوان در
            صرافی امن کریپتر اقدام به معامله و خرید ارز دیجیتال نمایید. پلتفرم
            ترید حرفه ای
          </p>
        </div>
        <div>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 lg:w-3/4 mx-auto">
            <CryptoGuide />
            <QuickAccess />
            <ImportantLinks />
          </div>
        </div>
      </div>
      <FooterLine />
      {/* ___________________ شبکه‌های اجتماعی  ___________________ */}
      <SocialMedia />

      {/* ___________________  حقوق مادی و معنوی  ___________________ */}
      <FooterLine />
      <span className="block text-sm text-center mt-4 font-light">
        کلیه حقوق مادی و معنوی این صفحه متعلق به{" "}
        <span className="font-semiBold">ستایش کریمی</span> می‌باشد.
      </span>
    </footer>
  );
}

const NewsLetter = () => {
  return (
    <>
      {" "}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-8 items-center">
        <div>
          <img src={img.logo_red} alt="logo" className="mx-auto" />
          <span className="block mt-4">
            عضویت در خبرنامه کریپتر آخرین اخبار و اطلاعیه‌ها را در ایمیل خود
            دریافت کنید:
          </span>
        </div>
        <div>
          <div className="bg-white rounded-lg p-1 flex items-center gap-2 lg:w-3/4 w-full mx-auto transition-all focus-within:shadow-lg">
            <input
              type="email"
              className="outline-none w-full text-gray-900 text-left ltr"
            />
            <button className="bg-blue-primary text-white rounded-lg p-2 text-sm">
              عضویت
            </button>
          </div>
        </div>
      </div>
      <FooterLine />
    </>
  );
};

const CryptoGuide = () => {
  const list = [
    "نحوه ثبت‌نام",
    "روش‌های خرید و فروش",
    "شیوه‌های پرداخت",
    "مقالات آموزشی",
    "وبلاگ کریپتر",
    "سوالات متداول",
  ];
  return (
    <div>
      <span className="font-bold text-lg block mb-4">راهنمای کریپتر</span>
      <ul className="list-disc pr-4">
        {list.map((title) => (
          <li key={title}>
            <Link to="" className="text-white text-sm block mt-2 font-semiBold">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const QuickAccess = () => {
  const list = [
    "خرید تتر",
    "خرید بیت‌کوین",
    "خرید اتریوم",
    "خرید دوج کوین",
    "خرید bnb",
    "خرید سولانا",
    "خرید شیبا",
    "خرید آواکس",
    "خرید متیک",
  ];
  return (
    <div>
      <span className="font-bold text-lg block mb-4">دسترسی سریع</span>
      <ul className="list-disc pr-4">
        {list.map((title) => (
          <li key={title}>
            <Link to="" className="text-white text-sm block mt-2 font-semiBold">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ImportantLinks = () => {
  const list = [
    "درباره ما",
    "تماس با ما",
    "قوانین و مقررات",
    "معرفی دوستان",
    "فرصت‌های شغلی",
    "اطلاعیه‌ها",
  ];
  return (
    <div>
      <span className="font-bold text-lg block mb-4">لینک‌های مهم</span>
      <ul className="list-disc pr-4">
        {list.map((title) => (
          <li key={title}>
            <Link to="" className="text-white text-sm block mt-2 font-semiBold">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SocialMedia = () => {
  return (
    <div className="flex justify-between items-center text-white mt-8">
      <span className="block text-xl font-bold">شبکه‌های اجتماعی</span>
      <div className="flex items-center gap-4">
        <FaLinkedinIn size={30} />
        <PiInstagramLogoFill size={30} />
        <BsTwitter size={30} />
      </div>
    </div>
  );
};

const FooterLine = () => {
  return (
    <span
      className="block w-full h-[2px] mt-6"
      style={{
        background:
          "linear-gradient(90deg, rgba(27, 67, 204, 0.00) 25.74%, #FAFDFF 51.31%, rgba(27, 67, 204, 0.00) 77.2%)",
      }}
    ></span>
  );
};
