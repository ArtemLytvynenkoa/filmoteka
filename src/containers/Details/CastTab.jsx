import { 
  Col, 
  Image, 
  Row,
  Space,
  Typography,
} from "antd";
import { defaultImg } from "images";

const { Text } = Typography;

const CastTab = ({ cast }) => (
  <Row gutter={ [8, 8] }>
    {
      cast.map(({ 
        cast_id,
        name,
        profile_path,
        character
      }) => (
        <Col span={ 6 } key={cast_id}>
          <Space direction="vertical">
            <Image 
              alt={name}
              src={profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : defaultImg}
              width={ 150 }
              height={ 225 }
              style={{ borderRadius: '15px' }}
            />
            <Text type="secondary">Name:</Text>
            <Text strong>{name}</Text>
            <Text type="secondary">Character:</Text>
            <Text strong>{character}</Text>
          </Space>
          
        </Col>
      ))
    }
  </Row>
);

export default CastTab;