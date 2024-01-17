import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  white-space: nowrap;
  color: ${(props) => props.theme.accentColor};
`;

interface RouteParams {
  coinId: string;
}
interface LocationState {
  state: {
    name: string;
    rank: number;
  };
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: number;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoading] = useState(true);
  //useParams훅 사용하여 url 파라미터 값 가져옴
  const { coinId } = useParams() as unknown as RouteParams;
  const { state } = useLocation() as LocationState;
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setpriceInfo] = useState<PriceData>();

  const getCoins = async () => {
    //axcios 사용
    const infoData = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
    const priceData = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);

    //fatch함수 사용
    // const response = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
    // const response = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();

    // console.log(infoData.data);
    console.log(priceData.data);

    setInfo(infoData.data);
    setpriceInfo(priceData.data);
  };

  useEffect(() => {
    getCoins();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..SS"}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
