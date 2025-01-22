import { useCoins } from "@hooks/use-coins";
import { timestampConvertor } from "@utils/timestamp-convertor"; // You can remove this if you don't need it
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
  cryptoname: string;
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const twoYearsAgo = new Date(currentDate.setMonth(currentMonth - 1));

const ChartComponent: React.FC<ChartComponentProps> = ({ cryptoname }) => {
  const { data: coins, isLoading } = useCoins(`/coins/${cryptoname}/charts?period=all`);

  const usdToIrrExchangeRate = 82300; 

  const [currency, setCurrency] = useState<'دلار' | 'تومان'>('دلار'); 

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === 'دلار' ? 'تومان' : 'دلار'));
  };

  function convertToPersianDate(timestamp: any) {
    return moment(timestamp).format('jYYYY/jMM/jDD'); 
  }

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
    .map((item: any) => {
      return [timestampConvertor(item[0]), item[1], item[2], item[3], item[4]];
    });

  const chartLabels = filteredCoins?.map((item: any) => {
    try {
      return convertToArabicNumerals(convertToPersianDate(item[0]));
    } catch (error) {
      console.error("Error converting timestamp:", error);
      return item[0]; 
    }
  });

  const chartData = filteredCoins?.map((item: any) => {
    const priceInUsd = item[1];
    if (currency === 'دلار') {
      return priceInUsd; 
    } else {
      return Math.round((priceInUsd * usdToIrrExchangeRate));
    }
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `قیمت ${cryptoname} (${currency})`, 
        data: chartData,
        borderColor: "rgb(0, 0, 0)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `قیمت ${cryptoname}`,
        font: {
          family: 'YekanBakh', 
          size: 16,
        },
      },
      legend: {
        labels: {
          font: {
            family: 'YekanBakh', 
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'YekanBakh', 
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: 'YekanBakh', 
          },
        },
      },
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container bg-white p-6 rounded-lg shadow-lg mb-5">
      <div className="currency-toggle mb-4">
        <button
          onClick={toggleCurrency}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          تغییر ارز به {currency === 'دلار' ? 'تومان' : 'دلار'}
        </button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
