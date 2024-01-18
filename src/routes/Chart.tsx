// 2. 하위 컴포넌트에서 useOutletContext()훅을 이용해서 props를 받아올 수 있습니다.
import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { fetchCoinHistory } from "../api";

interface ChartProps {
  coinId: string;
}

function Chart() {
  // 상위 컴포넌트 Coin애서 outlet을 이용하여 coinId보낸 인자를 받음
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return <h1>Chart</h1>;
}

export default Chart;
