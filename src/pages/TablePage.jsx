//тут будет таблица криптовалют с информацией
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getInfoCoinCap } from "../api/ApiCoinCap";
import { useDispatch, useSelector } from "react-redux";
import { cionsSelector } from "../redux/coinsSlice";
import { Spin } from 'antd';
import { openModal } from "../redux/modalSlice";
import {ModalBuyCrypt} from '../components/ModalBuyCrypt'
import { ModalPortfolio } from "../components/ModalPortfolio";

const TablePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {items, loading} = useSelector(cionsSelector);
  // console.log(items);


  useEffect(() => {
    dispatch(getInfoCoinCap());
  }, [dispatch]);

  const columns = [
    {
      title: "№",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: 'center',
      render: (text, record) => (
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "1fr 1fr",
            textAlign: "start",
          }}
        >
          <div style={{ color: "red" }}>{record.symbol}</div>
          <div>{text}</div>
        </div>
      ),
    },
    {
      title: "VWAP(24Hr)",
      dataIndex: "vwap24Hr",
      key: "vwap24Hr",
      render: (value) => (value ? `${parseFloat(value).toFixed(2)} $` : "-"),
    },
    {
      title: "Change(24Hr)",
      dataIndex: "changePercent24Hr",
      key: "changePercent24Hr",
      render: (value) => (value ? `${parseFloat(value).toFixed(2)} $` : "-"),
    },
    {
      title: "Market Cap",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      render: (value) =>
        value ? `${(Number(value) / 100000000000).toFixed(1)} млрд $` : "-",
    },

    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      render: (value) => (value ? `${parseFloat(value).toFixed(2)} $` : "-"),
    },
    {
      title: "",
      key: "add",
      render: (_, record) => {
        return (
          <Button
            style={{ color: "red", border: "none", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Клик по плюсу", record);
             dispatch(openModal(record))
              
            }}
          >
            <PlusOutlined />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <ModalPortfolio/>
      <ModalBuyCrypt/>
      <Table
        dataSource={items}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => {
            console.log("Клик по всей строке ", record.id);
            navigate("/info");
          },
        })}
        pagination={{
          placement: ["bottomCenter"],
        }}
        loading={loading && <Spin size="large" />}
      />
      ;
    </>
  );
};

export default TablePage;
