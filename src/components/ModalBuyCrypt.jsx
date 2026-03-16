import { useDispatch, useSelector } from "react-redux";
import { closeModal, modalSelector, openPortfolio } from "../redux/modalSlice";
import { Button, InputNumber, Modal } from "antd";
import { useState } from "react";
import { addTasks } from "../redux/portfolioSlice";

export const ModalBuyCrypt = () => {
  const dispatсh = useDispatch();
  const { isOpen, modalData } = useSelector(modalSelector);
  const [amount, setAmount] = useState(0);
  const handleBuy = () => {
      // console.log('передать данные')
      
    if (amount > 0) {
      //отправляем в портфель
      dispatсh(addTasks({ modalData, total: amount }));
      dispatсh(openPortfolio());
      dispatсh(closeModal());
      setAmount(0);
    }
  };

  return (
    <>
      <Modal
        title={modalData ? `Купить ${modalData.name}` : "Загрузка..."}
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
          style={{ width: "100%" }}
          value={amount}
          onChange={(val) => setAmount(val)}
        />
      </Modal>
    </>
  );
};
