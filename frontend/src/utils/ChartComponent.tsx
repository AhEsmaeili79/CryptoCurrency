import { useCoins } from "@hooks/use-coins";
import { timestampConvertor } from "@utils/timestamp-convertor"; // You can remove this if you don't need it
import React, { useState, useEffect } from "react";
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

interface ChartComponentProps {
  cryptoname: string;
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const twoYearsAgo = new Date(currentDate.setMonth(currentMonth - 1));

const ChartComponent: React.FC<ChartComponentProps> = ({ cryptoname }) => {
  const { data: coins, isLoading } = useCoins(`/coins/${cryptoname}/charts?period=all`);

  // Exchange rate (you can replace this with a dynamic API call)
  const usdToIrrExchangeRate = 42000; // Example value

  // State to track selected currency
  const [currency, setCurrency] = useState<'دلار' | 'تومان'>('دلار'); // Default is دلار

  // Function to toggle between دلار and تومان
  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === 'دلار' ? 'تومان' : 'دلار'));
  };

  // Function to convert timestamp to Persian date using moment-jalaali
  function convertToPersianDate(timestamp: any) {
    return moment(timestamp).format('jYYYY/jMM/jDD'); // Directly use timestamp in milliseconds
  }

  // Filter and process data to include the last 24 months
  const filteredCoins = coins
    ?.filter((item: any) => {
      const itemDate = new Date(timestampConvertor(item[0]));
      return itemDate >= twoYearsAgo && itemDate <= new Date();
    })
    .slice(0, 50)
    .map((item: any) => {
      return [timestampConvertor(item[0]), item[1], item[2], item[3], item[4]];
    });

  // Prepare labels for the chart using Persian dates
  const chartLabels = filteredCoins?.map((item: any) => {
    try {
      return convertToPersianDate(item[0]); // Convert to Persian date
    } catch (error) {
      console.error("Error converting timestamp:", error);
      return item[0]; // Fallback to raw timestamp if conversion fails
    }
  });

  // Convert data to the selected currency
  const chartData = filteredCoins?.map((item: any) => {
    const priceInUsd = item[1];
    if (currency === 'دلار') {
      return priceInUsd; // If USD, keep it as is
    } else {
      // Convert to تومان (divide by 10 and round)
      return Math.round((priceInUsd * usdToIrrExchangeRate) / 10);
    }
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: `قیمت ${cryptoname} (${currency})`, // Dynamic label based on selected currency
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
