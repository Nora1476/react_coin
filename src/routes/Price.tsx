import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
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
interface CandleData {
  x: number;
  y: number[];
}

const ChartWarp = styled.div`
  .apexcharts-tooltip {
    background: #f3f3f3;
    color: #000;
  }
`;

function Price() {
  // 상위 컴포넌트 Coin애서 outlet을 이용하여 coinId보낸 인자를 받음
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId)
    // { refetchInterval: 100000 }
  );
  const chartData: CandleData[] | undefined = data?.map((item) => {
    return {
      x: Number(item.time_close),
      y: [item.open, item.high, item.low, item.close],
    };
  });

  const options = {
    chart: {
      foreColor: "#fff",
      height: 300,
      width: 500,
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const series = [
    {
      data: [chartData as unknown as number],
    },
  ];
  console.log(series);
  return (
    <ChartWarp>
      {isLoading ? (
        "Loading chart ... "
      ) : (
        <ApexChart
          type="candlestick"
          options={options}
          series={[
            {
              data: [chartData as unknown as number],
            },
          ]}
          height={300}
        />
      )}
    </ChartWarp>
  );
}

export default Price;
