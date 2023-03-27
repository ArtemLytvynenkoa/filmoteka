import { 
  Avatar,
  Col, 
  Row, 
  Space,
  Tag,
  Typography
} from "antd";

const { Text } = Typography;

const ReviewsTab = ({ reviews }) => (
  <Row gutter={ [16, 16] }>
    { reviews.map(({
      author,
      author_details,
      content,
      created_at,
      id
      }) => (
        <Col key={ id } span={ 24 }>
          <Row gutter={ [8, 8] }>
            <Col span={ 24 } >
              <Space>
                <Avatar 
                  src={ `https://image.tmdb.org/t/p/w500${author_details.avatar_path}`}
                  size={ 50 }
                >
                  { !author_details?.avatar_path && author}
                </Avatar>
                <Tag color="#ff6b01">{ author }</Tag>
              </Space>
            </Col>
            <Col
              span={ 24 } 
              style={{
                border: '1px solid #ff6b01',
                borderRadius: '15px',
                backgroundColor: 'rgba(245, 185, 142, 0.2705882353)'
              }}
            >
              <div style={{ padding: '15px' }}>
                <Text>
                  { content }
                </Text>
              </div>
            </Col>
          </Row>
        </Col>
      )) 
    }
  </Row>
);

export default ReviewsTab;