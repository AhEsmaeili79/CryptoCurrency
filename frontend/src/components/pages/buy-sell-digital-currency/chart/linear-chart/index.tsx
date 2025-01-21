import { useCoins } from "@hooks/use-coins";
import { timestampConvertor } from "@utils/timestamp-convertor";
import ReactEcharts from "echarts-for-react";
import LinearChartSkeleton from "./skeleton";
import React, { useState } from "react";
import moment from "moment-jalaali";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function LinearChart() {
  const { data: coins, isLoading } = useCoins(`/coins/bitcoin/charts?period=all`);

  const [showChartJS, setShowChartJS] = useState(true); // Toggle between Chart.js and ECharts

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const twoYearsAgo = new Date(currentDate.setMonth(currentMonth - 24)); // 24 months ago
  const convertToArabicNumerals = (number: number | string): string => {
    return number
      .toString()
      .replace(/\d/g, (digit) => String.fromCharCode(0x0660 + parseInt(digit, 10)));
  };
  const filteredCoins = coins
    ?.filter((item: any) => {
      const itemDate = new Date(timestampConvertor(item[0]));
      return itemDate >= twoYearsAgo && itemDate <= new Date();
    })
    .slice(0, 50)
    .map((item: any) => [timestampConvertor(item[0]), item[1], item[2], item[3], item[4]]);

  const data0 = splitData(filteredCoins || []);

  function splitData(rawData: any) {
    const categoryData = [];
    const values = [];
    for (let i = 0; i < rawData.length; i++) {
      const [timestamp, open, close, low, high] = rawData[i];
      categoryData.push(timestamp);
      values.push([open, close, low, high || close]);
    }
    return { categoryData, values };
  }

  // Chart.js Configurations
  const chartLabels = filteredCoins?.map((item: any) =>
    convertToArabicNumerals(moment(item[0]).format("jYYYY/jMM/jDD"))
  );
  const chartData = filteredCoins?.map((item: any) => item[1]);
  const chartJSData = {
    labels: chartLabels,
    datasets: [
      {
        label: "قیمت بیت کوین (دلار)",
        data: chartData,
        borderColor: "rgb(30, 30, 31)",
        fill: false,
      },
    ],
  };
  const chartJSOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "قیمت بیت کوین ",
        font: { size: 16, family: "YekanBakh" },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: "YekanBakh", // Apply YekanBakh font
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "YekanBakh", // Apply YekanBakh font
          },
        },
      },
    },
  };

  // ECharts Configurations
  const echartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    xAxis: {
      type: "category",
      data: data0.categoryData.map((timestamp: any) =>
        convertToArabicNumerals(moment(timestamp).format("jYYYY/jMM/jDD"))
      ),
      axisLabel: {
        fontFamily: "YekanBakh", // Apply YekanBakh font
      },
    },
    yAxis: { 
      scale: true,
      axisLabel: {
        fontFamily: "YekanBakh", // Apply YekanBakh font
      },
    },
    series: [
      {
        type: "candlestick",
        data: data0.values,
        itemStyle: { color: "#00ff00", borderColor: "#009900" },
      },
    ],
    textStyle: {
      fontFamily: "YekanBakh", // Apply YekanBakh font globally
    },
  };

  if (isLoading) {
    return <LinearChartSkeleton />;
  }

  return (
    <div style={{ fontFamily: "YekanBakh" }}>
      <div className="chart-toggle mb-4">
        <button
          onClick={() => setShowChartJS(!showChartJS)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          تغییر به نمودار {showChartJS ? "میله ای" : "خطی"}
        </button>
      </div>
      {showChartJS ? (
        <div className="chart-container">
          <Line data={chartJSData} options={chartJSOptions} />
        </div>
      ) : (
        <ReactEcharts option={echartsOption} />
      )}
    </div>
  );
}
