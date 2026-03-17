import { Button, InputNumber, Table } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cionsSelector } from "../redux/coinsSlice";
import { IndexLineChart } from "../components/LineChart";
import { useEffect, useState } from "react";
import { addTasks } from "../redux/portfolioSlice";
import { openPortfolio } from "../redux/modalSlice";
import { ModalPortfolio } from "../components/ModalPortfolio";
import { getInfoCoinCap } from "../api/ApiCoinCap";

export const InfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useSelector(cionsSelector);
  const [num, setNum] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getInfoCoinCap());
    }
  }, [dispatch, items]);

  const findCrypt = items.find((item) => item.id === id);

  if (!findCrypt) {
    navigate("/");
    return null;
  }

  const columns = [
    {
      title: "Информация",
      dataIndex: "info",
      key: "info",
    },

    {
      title: "Данные о валюте",
      dataIndex: "data",
      key: "data",
    },
  ];

  const dataSource = [
    {
      key: "1",
      info: "Цена",
      data: `${parseFloat(findCrypt.priceUsd).toFixed(2)} $`,
    },
    {
      key: "2",
      info: "Доступное приложение для торговли",
      data: `${parseFloat(findCrypt.supply).toFixed(2)} млн`,
    },
    {
      key: "3",
      info: "Общее кол-во выпущенных активов",
      data: findCrypt.maxSupply
        ? `${parseFloat(findCrypt.maxSupply).toFixed(2)} млн`
        : 0,
    },
    {
      key: "4",
      info: "Объём торгов за последние 24 часа",
      data: `${parseFloat(findCrypt.volumeUsd24Hr).toFixed(2)} млн`,
    },
    {
      key: "5",
      info: "Средняя цена по объёму за последние 24 часа",
      data: `${parseFloat(findCrypt.vwap24Hr).toFixed(2)} $`,
    },
    {
      key: "6",
      info: "Процентное изменения цены за последние 24 часа",
      data: `${parseFloat(findCrypt.changePercent24Hr).toFixed(2)} %`,
    },
    {
      key: "7",
      info: "Сайт",
      data: (
        <a href={findCrypt.explorer} target="_blank" rel="noopener noreferrer">
          {findCrypt.explorer}
        </a>
      ),
    },
  ];

  const buyClick = () => {
    if (num > 0) {
      dispatch(addTasks({ modalData: findCrypt, total: num }));
      dispatch(openPortfolio());
      setNum("");
    }
  };

  return (
    <>
      <ModalPortfolio />
      <div>
        <h1 className="info-title">
          <span>{findCrypt?.symbol}</span> {findCrypt?.name}{" "}
        </h1>
        <div className="info-modal">
          <h2>Введите количество:</h2>
          <InputNumber
            min={0}
            style={{ width: "50%", marginBottom: "20px" }}
            value={num}
            onChange={(val) => setNum(val)}
            placeholder="0"
          />
          <Button type="primary" onClick={buyClick}>
            Купить
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
          rowKey="id"
          style={{ cursor: "pointer" }}
        />
        <IndexLineChart item={findCrypt} />
        <Button onClick={() => navigate("/")}>
          <ArrowLeftOutlined />
          Назад
        </Button>
      </div>
    </>
  );
};
