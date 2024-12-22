import { useCoins } from "@hooks/use-coins";
import { timestampConvertor } from "@utils/timestamp-convertor";
import ReactEcharts from "echarts-for-react";
import LinearChartSkeleton from "./skeleton";

export default function LinearChart() {
  const { data: coins, isLoading } = useCoins(`/coins/bitcoin/charts?period=all
    `);

  let option;
  const upColor = "#ec0000";
  const upBorderColor = "#8A0000";
  const downColor = "#00da3c";
  const downBorderColor = "#008F28";

  const coins_array = coins?.slice(0, 50).map((item: any) => {
    return [timestampConvertor(item[0]), item[1], item[2], item[3]];
  });

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

  function splitData(rawData: any) {
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i]);
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

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },

    xAxis: {
      type: "category",
      data: data0.categoryData,
      boundaryGap: false,
      min: "dataMin",
      max: "dataMax",
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    // dataZoom: [
    //   {
    //     type: "inside",
    //     start: 50,
    //     end: 200,
    //   },
    //   {
    //     show: true,
    //     type: "slider",
    //     top: "90%",
    //     start: 50,
    //     end: 200,
    //   },
    // ],
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
          opacity: 0.5,
        },
      },
      {
        name: "تتر",
        type: "line",
        data: calculateMA(10),
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
      },
    ],
  };

  return isLoading ? <LinearChartSkeleton /> : <ReactEcharts option={option} />;
}
