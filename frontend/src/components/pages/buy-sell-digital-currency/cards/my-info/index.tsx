import { MyInfoCardDataTpe } from "./type";

export default function MyInfoCard() {
  const my_data: MyInfoCardDataTpe = [
    {
      title: "نام",
      value: "ستایش کریمی",
    },
    {
      title: "کد کریپتر",
      value: "5048/02",
    },
    {
      title: "تعداد معامله",
      value: "504",
    },
  ];
  return (
    <div className="bg-[#CCE0EB] p-6 rounded-2xl grid grid-cols-3 gap-2 items-center h-fit">
      <div className="w-16 h-16 bg-white rounded-full"></div>
      <div className="col-span-2 flex flex-col gap-2">
        {my_data.map(({ title, value }) => (
          <div className="flex justify-between items-center text-gray-800" key={title}>
            <span className="text-sm font-bold">{title}</span>
            <span className="text-sm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
