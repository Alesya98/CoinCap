import { WalletOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cionsSelector } from "../redux/coinsSlice";
import { openPortfolio } from "../redux/modalSlice";
import { resultSelector } from "../redux/portfolioSlice";

export const Header = () => {
  const { items } = useSelector(cionsSelector);
  const popularCoins = items.slice(0, 3);
  const dispatch = useDispatch();
  const resultPortfolio = useSelector(resultSelector);


  return (
    <div className="header">
      <div>
         <p className="header-title">Популярные криптовалюты: </p>
        <div className="header-list">
          {popularCoins.map((item) => (
            <div className="header-item" key={item.id}>
              {item.name}
              <span>{parseFloat(item.vwap24Hr).toFixed(2)}</span>
            </div>
          ))}
        </div>
   </div>

      <div
        className="header-total"
        onClick={() => dispatch(openPortfolio())}
        style={{ cursor: "pointer" }}
      >
        <WalletOutlined className="header-icon" />
        <div className="header-content">
          <p>Итого:</p>
          <p>{resultPortfolio} USD</p>
        </div>
      </div>
    </div>
  );
};
