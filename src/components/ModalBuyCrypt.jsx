import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalSelector, openPortfolio } from "../redux/modalSlice";
import { Button, InputNumber, Modal } from "antd";
import { useState } from "react";
import { addTasks } from "../redux/portfolioSlice";

export const ModalBuyCrypt = () => {
  const dispatсh = useDispatch();
  const { isOpen, modalData } = useSelector(modalSelector);
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    if (amount > 0) {
      dispatсh(addTasks({ modalData, total: amount }));
      dispatсh(openPortfolio());
      dispatсh(closeModal());
      setAmount("");
    }
  };

  return (
    <>
      <Modal
        title={modalData.name}
        open={isOpen}
        onCancel={() => dispatсh(closeModal())}
        footer={[
          <Button type="primary" onClick={handleBuy}>
            Купить
          </Button>,
        ]}
      >
        <h2>Введите количесиво:</h2>
        <InputNumber
          min={0}
          type="number"
          style={{ width: "100%" }}
          value={amount}
          onChange={(val) => setAmount(val)}
          placeholder="0"
        />
      </Modal>
    </>
  );
};
