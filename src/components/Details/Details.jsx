import { 
  Button,
  Col,
  Divider,
  Image, 
  Row, 
  Space,
  Tabs,
  Tag,
  Typography
} from "antd";
import { defaultImg } from "images";
import {
  useNavigate, 
  useParams
} from "react-router-dom";
import { 
  CastTab,
  CustomButtons,
  ReviewsTab,
  TrailerTab 
} from "components";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setActivePage } from "redux/activePageSlice";
import { LoadingIndicator } from "components";

const { Text, Title } = Typography;

const Details = ({
  details,
  cast,
  reviews,
  trailerKey,
  isLoading,
  navigateLink
}) => {
  const { tvId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  console.log(details);

  if (isLoading && !details) {
    return <LoadingIndicator />
  };

  return (
    <div className="mainContent">
      <Row 
        justify="space-between"
        align="middle"
        style={{
          margin: '20px 0 0',
        }}
      >
        <Col>
          <Button
            type="link"
            onClick={ () => {
              navigate( navigateLink )
              dispatch(setActivePage(navigateLink))
            } }
          >
            <LeftOutlined /> 
            { ' ' }
            Back
          </Button>
        </Col>
        <Col>
          <CustomButtons 
            details={ details }
            cast={ cast }
            reviews={ reviews }
            trailerKey={ trailerKey }
          />
        </Col>
      </Row>
      <Row
        gutter={[20, 20]}
        style={{
          padding: '0 0 50px',
          width: '100%'
        }}
      >
        <Col flex="1">
          <Image 
            alt={ details?.title || details?.name}
            src={ 
              details?.poster_path 
                ? `https://image.tmdb.org/t/p/w500${details.poster_path}` 
                : defaultImg 
            }
            // preview={false}
            width={ 400 }
            height={ 550 }
            style={{ borderRadius: '15px' }}
          />
        </Col>
        <Col flex="3">
          
          <Space direction="vertical" style={{ width: '100%',  textAlign: "start" }}>
            <Title type="secondary">
              { details?.title || details?.name }
            </Title>
            <Divider 
              style={{
                backgroundColor: '#ff6b01',
                margin: '0'
              }}
            />
            <Row gutter={ [ 8, 8 ] } 
              align="middle"
            >
              <Col span={ 12 }>
                <Row gutter={ [ 8, 8 ] }>
                  <Col span={ 12 }>
                    <Text type="secondary">Rating/Votes</Text>
                  </Col>
                  <Col span={ 12 }>
                    <Tag
                      color="#ff6b01"
                    >
                      { details?.vote_average }
                    </Tag>
                    /
                    { ' ' }
                    <Tag
                      color="gray"
                    >
                      { details?.vote_count }
                    </Tag>
                  </Col>
                  <Col span={ 12 }>
                    <Text type="secondary">Popularity</Text>
                  </Col>
                  <Col span={ 12 }>
                    <Text strong>{ details?.popularity }</Text>
                  </Col>
                  <Col span={ 12 }>
                    <Text type="secondary">Original Title</Text>
                  </Col>
                  <Col span={ 12 }>
                    <Text strong>{ details?.original_name || details?.original_title }</Text>
                  </Col>
                  <Col span={ 12 }>
                    <Text type="secondary">Genre</Text>
                  </Col>
                  <Col span={ 12 }>
                    <Text strong>{ details?.genres.map(({ name }) => name).join(', ') }</Text>
                  </Col>
                  { tvId && (
                    <>
                      <Col span={ 12 }>
                        <Text type="secondary">Seasons/Episodes</Text>
                      </Col> 
                      <Col span={ 12 }>
                        <Tag
                          color="#ff6b01"
                        >
                          { details?.number_of_seasons }
                        </Tag>
                        /
                        { ' ' }
                        <Tag
                          color="gray"
                        >
                          { details?.number_of_episodes}
                        </Tag>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
              <Col
                span={ 12 }
                style={{
                  textAlign: "center",
                }}
              >
                { (details?.production_companies.length !== 0 ) 
                  && details?.production_companies.filter(({logo_path}) => logo_path).map(({logo_path, name}) => (
                    <Image 
                      key={ logo_path } 
                      alt={ name }
                      src={ 
                        details?.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${logo_path}` 
                          : null 
                      }
                      preview={false}
                      width={ details?.production_companies.length > 1 ? 100 : 300}
                      onClick={() => details?.homepage && window.open(details?.homepage)}
                      style={{ 
                        cursor: "pointer",
                        padding: "0 5px"
                      }}
                    />
                  ))
                }
              </Col>
            </Row>
            <Divider 
              style={{
                backgroundColor: '#ff6b01',
                margin: '0'
              }}
            />
            <Title level={ 5 } type="secondary">
              Overview
            </Title>
            <Text>
              { details?.overview }
            </Text>
            <Divider 
              style={{
                backgroundColor: '#ff6b01',
                margin: '0'
              }}
            />
            <Tabs
              defaultActiveKey="trailer"
              items={[{
                key: 'trailer',
                label: 'Trailer',
                children: <TrailerTab trailerKey={ trailerKey }/>,
              }, {
                key: 'cast',
                label: 'Cast',
                children: <CastTab cast={ cast }/>,
              }, {
                key: 'reviews',
                label: 'Reviews',
                children: <ReviewsTab reviews={ reviews }/>,
              }]}
            />
          </Space>
        </Col>
      </Row>
    </div>
  )
};

export default Details;