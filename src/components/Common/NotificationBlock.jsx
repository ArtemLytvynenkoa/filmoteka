import { 
  Tag,
  Typography,
} from "antd";

const { Title } = Typography;

const NotificationBlock = ({ text }) => (
  <Tag color="red" style={{ marginTop: '20px' }}>
    <Title level={ 3 } style={{ color: "red" }}>{text}</Title>
  </Tag>
);

export default NotificationBlock;