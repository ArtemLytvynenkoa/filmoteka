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
  <Row 
    gutter={ [8, 8] } 
    style={{ textAlign: 'center' }}
  >
    {
      cast.map(({ 
        cast_id,
        name,
        profile_path,
        character
      }) => (
        <Col  
          key={ cast_id }
          xs={ 24 }
          sm={ 12 }
          md={ 8 }
          lg={ 6 }
          xxl={ 4 }
        >
          <Space 
            direction="vertical"
            style={{ textAlign: 'start' }}
          >
            <Image
              className="cast-img"
              alt={ name }
              src={ profile_path ? `https://image.tmdb.org/t/p/w500${profile_path}` : defaultImg }
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