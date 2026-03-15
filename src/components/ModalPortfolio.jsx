import { Button, Modal, Table } from "antd"
import { closePortfolio, modalSelector } from "../redux/modalSlice"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, portfolioSelector } from "../redux/portfolioSlice";
import { CloseOutlined } from "@ant-design/icons";

export const ModalPortfolio = () => {
    const { isOpenPortfolio } = useSelector(modalSelector);
    const modalData = useSelector(portfolioSelector);
    const dispatch = useDispatch()

    const dataSource = modalData.map((item) => ({
      key: item.modalData.id,
      name: item.modalData.name,
      price: parseFloat(item.modalData.priceUsd),
      amount: item.total,
      totalSum: parseFloat(item.modalData.priceUsd) * item.total,
    }));

    console.log('Данные таблицы',dataSource, dataSource.length)

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
      },
      {
        title: "Кол-во",
        dataIndex: "amount",
      },
      {
        title: "Итого",
        dataIndex: "totalSum",
      },
      {
        title: "",
        key: "delete",
        render: (_, record) => {
          return (
            <Button
              style={{ color: "red", border: "none", cursor: "pointer" }}
              onClick={() => dispatch(deleteTask(record.id))}
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
                title={'Портфель'}
                open={isOpenPortfolio}
                onCancel={() => dispatch(closePortfolio())}
                footer={null}
                width={700}
            >
                <Table columns={columns} dataSource={dataSource} rowKey='id' pagination={false}>
            
                </Table>

                <p>`Итого: ${dataSource.price * dataSource.length}`</p>
                
           </Modal>
        </>
    )
}