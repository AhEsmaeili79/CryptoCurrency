import { img } from "@data";
import SectionsTitle from "@common/titles/section";
import Calculator from "@common/calculator";

export default function OnlineCalculator() {
  return (
    <div
    id="online-calulator"
      className="lg:mt-24 mt-12 pb-12 lg:px-8 md:px-4 px-2"
      style={{
        background: `url(${img.online_calculator_bg}) no-repeat center left`,
        backgroundSize: "contain",
      }}
    >
      <section>
        <SectionsTitle number={4} title="مبادله" subTitle="ماشین حساب آنلاین" />
        <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-16 gap-4">
          <img
            src={img.wallet}
            alt="wallet"
            className="m-auto lg:w-2/3 md:block hidden"
          />
          <div className="relative">
            <img
              src={img.credit_card}
              alt="credit card"
              className="absolute z-0 -top-20 md:left-0 left-0 md:w-fit w-2/3"
            />
            <Calculator />
          </div>
        </div>
      </section>
    </div>
  );
}
