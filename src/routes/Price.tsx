import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
interface CandleData {
  x: string;
  y: number[];
}

const ChartWarp = styled.div`
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: #000;
  }
`;

function Price() {
  const isDark = useRecoilValue(isDarkAtom);
  // 상위 컴포넌트 Coin애서 outlet을 이용하여 coinId보낸 인자를 받음
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // { refetchInterval: 100000 }
  );
  const chartData: CandleData[] | undefined = data?.map((data) => {
    return {
      x: new Date(Number(data.time_close) * 1000).toDateString(),
      y: [Number(data.open), Number(data.high), Number(data.low), Number(data.close)],
    };
  });
  console.log(chartData);

  return (
    <ChartWarp>
      {isLoading ? (
        "Loading chart ... "
      ) : (
        <ApexChart
          type="candlestick"
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              foreColor: "#000",
              background: "rgba(170, 166, 157,0.5)",
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            xaxis: {
              // axixTicks: { show: true },
              labels: {
                show: false,
              },
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
              labels: {
                formatter: function (val: number) {
                  return `$${val.toFixed(2)}`;
                },
              },
            },
          }}
          series={[{ data: chartData }] as unknown as number[]}
          height={300}
        />
      )}
    </ChartWarp>
  );
}

export default Price;
