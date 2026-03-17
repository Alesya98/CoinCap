import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoinHistory } from "../api/ApiCoinCap";
import { cionsSelector } from "../redux/coinsSlice";

export const IndexLineChart = ({ item }) => {
  const dispatch = useDispatch();
  const { history } = useSelector(cionsSelector);

  useEffect(() => {
    dispatch(getCoinHistory({ id: item.id, interval: "h1" }));
  }, [dispatch, item.id]);

  const formattedHistory =
    history.map((item) => ({
      ...item,
      priceUsd: parseFloat(item.priceUsd),
      date: new Date(item.time).getDate(),
    })) || [];

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "300px",
          margin: "20px 0",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width="100%"
            height="100%"
            margin={{ top: 10, right: 30, left: 60, bottom: 20 }}
            responsive
            data={formattedHistory}
          >
            <CartesianGrid
              stroke="#f5f5f5"
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="time"
              stroke="#666"
              tick={{ fill: "#666" }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleString("ru-RU", {
                  day: "numeric",
                  month: "short",
                });
              }}
              minTickGap={30}
            />
            <YAxis
              stroke="#666"
              tickFormatter={(value) => `$${value.toFixed(2)}`}
            />
            <Tooltip
              labelFormatter={(value) => {
                return new Date(value).toLocaleString("ru-RU");
              }}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Цена",
              ]}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            <Line
              type="monotone"
              dataKey="priceUsd"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#4CAF50",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
