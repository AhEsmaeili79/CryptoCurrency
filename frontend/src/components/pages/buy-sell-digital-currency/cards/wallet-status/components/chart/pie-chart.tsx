import { useWallet } from "@store/wallet";
import { numberSeprator } from "@utils/numberSeprator";
import ReactEcharts from "echarts-for-react";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";

export default function PieChart({ data }: any) {
  const customTime = useWallet((state) => state.time);

  const priceColor =
    data[customTime] > 0 && data[customTime] < 1
      ? "#FF8008"
      : data[customTime] < 0
      ? "#EC2500"
      : "#35E926 ";

  let colorPalette = [priceColor, "#D3DCFD"];

  const option = {
    series: [
      {
        type: "pie",
        radius: [`50%`, "100%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        color: colorPalette,
        data: [
          {
            value: data[customTime],
            name: data?.name,
          },
          { value: 100, name: "total supply" },
        ],
      },
    ],
  };

  return (
    <div>
      <div className="relative pie_chart">
        <ReactEcharts option={option} className="-mt-4" />
        <span className="absolute top-0 bottom-0 m-auto left-0 right-0 block w-fit h-fit md:text-xs text-sm font-bold text-gray-900 ltr">
          {data[customTime]}%
        </span>
      </div>

      <div className="flex justify-center items-center gap-2 -mt-1">
        <img src={data?.icon} alt={data?.name} className="w-6 h-6" />
        <span className="md:text-xs text-sm font-semiBold text-gray-900 whitespace-nowrap">
          {numberSeprator(data?.price.toFixed(0))}{" "}
          <span className="font-bold">{data?.name}</span>
        </span>
        <span
          className={`${
            data[customTime] > 0 ? "text-green-primary" : "text-red-primary"
          } `}
        >
          {data[customTime] > 0 ? <IoMdArrowRoundUp /> : <IoMdArrowRoundDown />}
        </span>
      </div>
    </div>
  );
}
