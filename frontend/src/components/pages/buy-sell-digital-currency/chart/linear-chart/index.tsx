import { useCoins } from "@hooks/use-coins";
import { timestampConvertor } from "@utils/timestamp-convertor";
import ReactEcharts from "echarts-for-react";
import LinearChartSkeleton from "./skeleton";
import { useState, useEffect } from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface LinearChartProps {
  coinName: string;
  coin: { id: string; name: string; symbol: string; icon: string };
}

export default function LinearChart({ coin }: LinearChartProps) {
  const { data: coins, isLoading } = useCoins(`/coins/${coin.id}/charts?period=all`);
  const [showChartJS, setShowChartJS] = useState(true); 
  const [currency, setCurrency] = useState<'دلار' | 'تومان'>('تومان'); 

  const conversionRate = 82300; 

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const twoYearsAgo = new Date(currentDate.setMonth(currentMonth - 6));

  const convertToArabicNumerals = (number: number | string): string => {
    return number
      .toString()
      .replace(/\d/g, (digit) => String.fromCharCode(0x0660 + parseInt(digit, 10)));
  };

  useEffect(() => {
    if (coins) {
      setFilteredCoins(
        coins.filter((item: any) => {
          const itemDate = new Date(timestampConvertor(item[0]));
          return itemDate >= twoYearsAgo && itemDate <= new Date();
        })
        .map((item: any) => [timestampConvertor(item[0]), item[1], item[2], item[3], item[4]])
      );
    }
  }, [coins]);

  const [filteredCoins, setFilteredCoins] = useState<any[]>([]);

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

  const convertPrice = (price: number) => {
    if (currency === 'دلار') {
      return price; 
    }
    return price * conversionRate; 
  };

  // Chart.js Configurations
  const chartLabels = filteredCoins?.map((item: any) =>
    convertToArabicNumerals(moment(item[0]).format("jYYYY/jMM/jDD"))
  );
  const chartData = filteredCoins?.map((item: any) => convertPrice(item[1])); 
  const chartJSData = {
    labels: chartLabels,
    datasets: [
      {
        label: `${coin.name} قیمت (${currency})`,
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
        text: `${coin.name} قیمت`,
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
            family: "YekanBakh", 
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: "YekanBakh", 
          },
        },
      },
    },
  };

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
        fontFamily: "YekanBakh", 
      },
    },
    yAxis: {
      scale: true,
      axisLabel: {
        fontFamily: "YekanBakh", 
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
      fontFamily: "YekanBakh", 
    },
  };

  if (isLoading) {
    return <LinearChartSkeleton />;
  }

  return (
    <div style={{ fontFamily: "YekanBakh" }}>
      <div className="chart-toggle mb-4 flex">
        <button
          onClick={() => setCurrency(currency === 'دلار' ? 'تومان' : 'دلار')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg w-1/2"
        >
          تغییر به {currency === 'دلار' ? 'تومان' : 'دلار'}
        </button>

        <div className="flex items-center justify-end w-1/2">
          <img
            src={coin.icon}
            alt={coin.symbol}
            className="w-12 h-12"
          />
          <span className="font-black text-2xl">{coin.symbol}</span>
        </div>
      </div>

      <div className="chart-container w-full">
        {showChartJS ? (
          <Line data={chartJSData} options={chartJSOptions} />
        ) : (
          <ReactEcharts option={echartsOption} />
        )}
      </div>
    </div>
  );
}
