import { img } from "@data";
import SectionsTitle from "@common/titles/section";
import { BsCupHotFill } from "react-icons/bs";
import { MdPrivacyTip } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbAwardFilled } from "react-icons/tb";

export default function BannerWhyCrypto() {
  return (
    <div
      className="lg:mt-24 mt-12 pb-12 lg:px-8 md:px-4 px-2"
      style={{
        background: `url(${img.crypto_market_bg}) no-repeat center right`,
        backgroundSize: "contain",
      }}
    >
      <section>
        <SectionsTitle number={3} title="کریپتر" subTitle="چرا" />
        <Cards />
      </section>
    </div>
  );
}

const Cards = () => {
  const list = [
    {
      icon: <TbAwardFilled className="mx-auto md:text-[7rem] text-[4rem]" />,
      title: "اولین در ایران",
      color: "#2150F5",
    },
    {
      icon: (
        <RiSecurePaymentFill className="mx-auto md:text-[7rem] text-[4rem]" />
      ),
      title: "کمترین کارمزد در ایران",
      color: "#E8B229",
    },
    {
      icon: <MdPrivacyTip className="mx-auto md:text-[7rem] text-[4rem]" />,
      title: "امن‌ترین بازارها",
      color: "#18CE2A",
    },
    {
      icon: <BsCupHotFill className="mx-auto md:text-[7rem] text-[4rem]" />,
      title: "ساده‌ترین رابط کاربری",
      color: "#F53A21",
    },
  ];
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 lg:gap-16 md:gap-6 gap-8">
      {list.map((item) => (
        <div style={{ color: item.color }} key={item.color}>
          {item.icon}
          <span
            className={`block text-center font-bold lg:text-xl text-md border-b-4 pb-4 mt-6`}
            style={{ borderBottomColor: item.color }}
          >
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
};
