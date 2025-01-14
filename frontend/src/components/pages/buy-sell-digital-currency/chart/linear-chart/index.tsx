import { useCoins } from "@hooks/use-coins";
import { timestampConvertor } from "@utils/timestamp-convertor";
import ReactEcharts from "echarts-for-react";
import LinearChartSkeleton from "./skeleton";
import moment from "moment-jalaali"; // Import moment-jalaali

export default function LinearChart() {
  const { data: coins, isLoading } = useCoins(`/coins/bitcoin/charts?period=all`);

 
  let option;
  const upColor = "#00ff00";  // Change up color (green)
  const upBorderColor = "#009900";  // Change up border color (dark green)
  const downColor = "#000";  // Change down color (red)
  const downBorderColor = "#000";  // Change down border color (dark red)
  const ma1Color = "#0066ff";  // Change "بیت کوین" MA line color (blue)
  const ma2Color = "#ff6600"; 

  const currentDate = new Date(); // Get current date
  const currentMonth = currentDate.getMonth(); // Get current month (0-based)
  const twoYearsAgo = new Date(currentDate.setMonth(currentMonth - 1)); // Set date to 24 months ago

  // Filter data to include the last 24 months
  const coins_array = coins
    ?.filter((item: any) => {
      const itemDate = new Date(timestampConvertor(item[0]));
      return itemDate >= twoYearsAgo && itemDate <= new Date(); // Only include data from the last 24 months
    })
    .slice(0, 50)
    .map((item: any) => {
      return [timestampConvertor(item[0]), item[1], item[2], item[3], item[4]]; // Add any additional data needed
    });

  console.log(coins_array);

  const data0 = splitData(
    coins_array
      ? coins_array
      : [
          ["2013/2/1", 2377.41, 2419.02, 2369.57, 2421.15],
          ["2013/2/4", 2425.92, 2428.15, 2417.58, 2440.38],
          ["2013/2/5", 2411, 2433.13, 2403.3, 2437.42],
          ["2013/2/6", 2432.68, 2434.48, 2427.7, 2441.73],
          ["2013/2/7", 2430.69, 2418.53, 2394.22, 2433.89],
          ["2013/2/8", 2416.62, 2432.4, 2414.4, 2443.03],
          ["2013/2/18", 2441.91, 2421.56, 2415.43, 2444.8],
          ["2013/2/19", 2420.26, 2382.91, 2373.53, 2427.07],
          ["2013/2/20", 2383.49, 2397.18, 2370.61, 2397.94],
          ["2013/2/21", 2378.82, 2325.95, 2309.17, 2378.82],
          ["2013/2/22", 2322.94, 2314.16, 2308.76, 2330.88],
          ["2013/2/25", 2320.62, 2325.82, 2315.01, 2338.78],
        ]
  );

  console.log(data0.values);

  function splitData(rawData: any) {
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
      const [timestamp, open, close, low, high] = rawData[i];
      
      // Handle missing high values
      const validHigh = high !== undefined ? high : close; // Fallback to close if high is undefined
  
      categoryData.push(timestamp);
      values.push([open, close, low, validHigh]);
    }
    return {
      categoryData: categoryData,
      values: values,
    };
  }

  function calculateMA(dayCount: any) {
    var result = [];
    for (var i = 0, len = data0.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += +data0.values[i - j][1];
      }
      result.push(sum / dayCount);
    }
    return result;
  }

  // Convert timestamp to Persian date using moment-jalaali
  function convertToPersianDate(timestamp: any) {
    return moment(timestamp).format('jYYYY/jMM/jDD'); // Directly use timestamp in milliseconds
  }

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
  
    grid: {
      left: "10%",  // Add space on the left side for Y-axis labels
      right: "10%",  // Add space on the right side for the chart elements
      bottom: "15%",  // Add space at the bottom for the X-axis title and labels
      top: "10%",  // Add space at the top for the title
    },
  
    xAxis: {
      type: "category",
      data: data0.categoryData.map((timestamp: any) => convertToPersianDate(timestamp)),
      boundaryGap: false,
      min: "dataMin",
      max: "dataMax",// X-axis title
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 14,
        color: "#333",
      },
      axisLabel: {
        margin: 10,  // Add space between the X-axis and labels
      },
    },
  
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },// Y-axis title
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 14,
        color: "#333",
      },
      axisLabel: {
        margin: 10,  // Add space between the Y-axis and labels
      },
    },
  
    series: [
      {
        name: "",
        type: "candlestick",
        data: data0.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        markPoint: {
          tooltip: {
            formatter: function (param: any) {
              return param.name + "<br>" + (param.data.coord || "");
            },
          },
        },
      },
      {
        name: "بیت کوین",
        type: "line",
        data: calculateMA(1),
        smooth: true,
        lineStyle: {
          color: ma1Color,
          opacity: 0.5,
        },
      },
      {
        name: "تتر",
        type: "line",
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          color: ma2Color,
          opacity: 0.5,
        },
      },
    ],
  };

  return isLoading ? <LinearChartSkeleton /> : <ReactEcharts option={option} />;
}