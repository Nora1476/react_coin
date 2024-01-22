// 2. 하위 컴포넌트에서 useOutletContext()훅을 이용해서 props를 받아올 수 있습니다.
import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ToggleDarkType {
  isDark: boolean;
}

const ChartWarp = styled.div`
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: #000;
  }
`;

function Chart() {
  // 상위 컴포넌트 Coin애서 outlet을 이용하여 coinId보낸 인자를 받음
  const { isDark } = useOutletContext<ToggleDarkType>();
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // { refetchInterval: 100000 }
  );

  const series = [
    {
      name: "Price",
      data: data?.map((price) => price.close).slice(0, 14) as number[],
    },
  ];

  return (
    <ChartWarp>
      {isLoading ? (
        "Loading chart ... "
      ) : (
        <ApexChart
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              foreColor: "#fff",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            grid: { show: false },
            yaxis: {
              show: false,
              labels: {
                formatter: function (val: number) {
                  return val.toFixed(2);
                },
              },
            },
            xaxis: {
              labels: { show: false },
              categories: data?.map((price) => new Date(Number(price.time_close) * 1000).toDateString()),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              enabled: true,
              style: {
                fontSize: "16px",
              },
              y: {
                formatter: function (val: number) {
                  return `$ ${val.toFixed(2)}`;
                },
              },
            },
          }}
          series={series}
          height={300}
        />
      )}
    </ChartWarp>
  );
}

export default Chart;

//   {
//   theme: {
//     mode: "light",
//   },
//   chart: {
//     foreColor: "#fff",
//     height: 300,
//     width: 500,
//     toolbar: {
//       show: false,
//     },
//   },
//   grid: { show: false },
//   yaxis: {
//     show: false,
//     labels: {
//       formatter: function (val: number) {
//         return val.toFixed(2);
//       },
//     },
//   },
//   xaxis: {
//     labels: { show: false },
//     categories: data?.map((price) => new Date(Number(price.time_close) * 1000).toDateString()),
//   },
//   fill: {
//     type: "gradient",
//     gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
//   },
//   colors: ["#0fbcf9"],
//   tooltip: {
//     enabled: true,
//     style: {
//       fontSize: "16px",
//     },
//     y: {
//       formatter: function (val: number) {
//         return `$ ${val.toFixed(2)}`;
//       },
//     },
//   },
// }
