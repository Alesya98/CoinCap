import { Button, Modal, Table } from "antd";
import { closePortfolio, modalSelector } from "../redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  portfolioSelector,
  setResultPortfolio,
} from "../redux/portfolioSlice";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export const ModalPortfolio = () => {
  const { isOpenPortfolio } = useSelector(modalSelector);
  const modalData = useSelector(portfolioSelector);
  const dispatch = useDispatch();

  const dataSource = modalData.map((item) => ({
    key: item.modalData.id,
    name: item.modalData.name,
    price: parseFloat(item.modalData.priceUsd),
    amount: item.total,
    totalSum: parseFloat(item.modalData.priceUsd) * item.total,
  }));

  const result = dataSource
    .reduce((acc, item) => (acc += item.totalSum), 0)
    .toFixed(2);

  useEffect(() => {
    dispatch(setResultPortfolio(result));
  }, [dispatch, result]);

  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      render: (v) => v.toFixed(2),
    },
    {
      title: "Кол-во",
      dataIndex: "amount",
    },
    {
      title: "Итого",
      dataIndex: "totalSum",
      render: (v) => v.toFixed(2),
    },
    {
      title: "",
      key: "delete",
      render: (_, record) => {
        return (
          <Button
            style={{ color: "red", border: "none", cursor: "pointer" }}
            onClick={() => dispatch(deleteTask(record.key))}
          >
            <CloseOutlined />
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title={"Портфель"}
        open={isOpenPortfolio}
        onCancel={() => dispatch(closePortfolio())}
        footer={null}
        width={700}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={false}
        ></Table>

        <p>Итого: {result} $</p>
      </Modal>
    </>
  );
};
