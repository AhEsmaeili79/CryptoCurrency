import { OnlinePricesTable } from "@common/table/online-prices";
import SectionsTitle from "@common/titles/section";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function OnlinePrices() {
  return (
    <div id="online-prices" className="mt-12 pb-12 md:pt-24 lg:px-8 md:px-4 px-2 md:w-full w-[95%] mx-auto md:rounded-none rounded-3xl">
      <section>
        {/* Title Section*/}
        <SectionsTitle number={2} title="آنلاین" subTitle="قیمت‌های">
          <button className="border border-blue-primary text-blue-primary rounded-lg flex items-center gap-2 p-2 h-fit md:text-sm text-xs font-semiBold">
            <Link to="/online-prices">تمامی قیمت‌ها</Link>
            <BsArrowLeft />
          </button>
        </SectionsTitle>
        {/* End Title Section*/}

        <OnlinePricesTable />
      </section>
    </div>
  );
}
