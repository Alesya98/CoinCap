import { Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const InfoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 

  return (
    <>
          <h1>Информация о крипте {id}</h1>

      <Button onClick={() => navigate("/")}>
        <ArrowLeftOutlined />
        Назад
      </Button>
    </>
  );
};
