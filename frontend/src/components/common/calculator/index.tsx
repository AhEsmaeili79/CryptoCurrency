import { RiSettings5Fill } from "react-icons/ri";
import { TbSwitchVertical } from "react-icons/tb";

export default function Calculator({ customClassName }: { customClassName?: string }) {
  return (
    <div
      className={`${
        customClassName
          ? customClassName
          : "border-2 backdrop-blur-xl border-blue-300 rounded-3xl px-4 py-6 lg:w-7/12 md:w-9/12 w-full mx-auto flex flex-col relative z-1"
      }`}
      style={{
        background: customClassName
          ? ""
          : "linear-gradient(318deg, #DFE6FF -0.59%, #E7ECFF 21.43%, rgba(235, 239, 255, 0.00) 110.69%)",
      }}
    >
      <div className="flex justify-between text-blue-primary items-center gap-16">
        <h4 className="font-bold text-xl ml-auto">مبادله</h4>
        <RiSettings5Fill size={30} />
      </div>

      <div className="mt-4">
        <label className="text-blue-primary font-semiBold mb-2 text-sm block">
          مقدار
        </label>
        <div className="bg-white border border-gray-200 py-1 px-4 rounded-lg flex gap-4">
          <input
            className="bg-transparent w-2/3 py-2 text-left outline-none placeholder:text-xs placeholder:text-gray-300 placeholder:text-right text-gray-400 text-sm ltr"
            placeholder="مقدار را وارد کنید"
            type="number"
            disabled
          />
          <select className="w-1/2 bg-transparent outline-none" defaultValue="" disabled>
            <option value="">گزینه‌ای انتخاب نشده</option>
          </select>
        </div>
      </div>
      <button className="my-2 mx-auto w-fit" disabled>
        <TbSwitchVertical className="text-green-primary" size={30} />
      </button>
      <div>
        <label className="text-blue-primary font-semiBold mb-2 text-sm block">
          تبدیل به
        </label>
        <div className="bg-white border border-gray-200 py-1 px-4 rounded-lg flex gap-4">
          <select className="w-full py-1 bg-transparent outline-none" disabled>
            <option hidden className="text-right m-4">
              انتخاب کنید
            </option>
            <option>گزینه‌ای انتخاب نشده</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 justify-center text-sm mt-2 text-blue-primary">
        <span>0 تتر</span>
      </div>
      <button
        className="bg-red-700 text-white rounded-xl py-2 font-bold mt-4 w-full"
        disabled
      >
        تبادل کن
      </button>
    </div>
  );
}
