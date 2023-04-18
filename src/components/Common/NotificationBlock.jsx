import { Typography } from "antd";

const { Title } = Typography;

const NotificationBlock = ({ text }) => (
  <Title level={ 3 } style={{ color: "red" }}>{text}</Title>
);

export default NotificationBlock;