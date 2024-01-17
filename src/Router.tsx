import { createBrowserRouter } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

const Router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <Coins />,
  },
  {
    path: ":coinId",
    element: <Coin />,
  },
]);
export default Router;
