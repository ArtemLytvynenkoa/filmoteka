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
import { LoadingIndicator } from "components";
import { defaultImg } from "images";
import { 
  useEffect, 
  useState 
} from "react";
import { 
  useNavigate,
  useParams 
} from "react-router-dom";
import { apiServices } from "services";
import { 
  CastTab,
  ReviewsTab,
  TrailerTab 
} from "containers";
import links from "links";
import { LeftOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const TVDetails = () => {
  const { tvId } = useParams();

  const [ isLoading, setIsLoading] = useState(true);
  const [ tvDitails, setTVDitails ] = useState(null);
  const [ cast, setCast ] = useState(null);
  const [ reviews, setReviews ] = useState(null);
  const [ trailerKey, setTrailerKey ] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!tvId) return;
    
    setIsLoading(true);

    apiServices.fetchTVDetails(tvId).then(ditails => setTVDitails(ditails));
    apiServices.fetchTVCast(tvId).then(({ cast }) => setCast(cast));
    apiServices.fetchTVReviews(tvId).then(({ results }) => setReviews(results));
    apiServices.fetchTVTrailer(tvId).then( ({ results }) => {
      const trailerObj = results.find(({ type }) => type === 'Trailer');

      setTrailerKey(trailerObj && trailerObj.key ? trailerObj.key : '')
    } );
    
    setIsLoading(false);

  }, [tvId]);

  console.log(tvDitails);

  if (isLoading && !tvDitails) {
    return <LoadingIndicator />
  }

  return (
    <div className="mainContent">
      <Row 
        justify="space-between"
        align="middle"
      >
        <Col>
          <Button
            style={{
              margin: '20px 0 0',
            }}
            type="link"
            onClick={ () => navigate(links.tvPage) }
          >
            <LeftOutlined /> 
            { ' ' }
            Back to TV
          </Button>
        </Col>
        <Col>
          <Space>
            <Button type="primary">ADD TO WATCHED</Button>
            <Button type="primary">ADD TO QUEUE</Button>
          </Space>
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
            alt={ tvDitails?.title }
            src={ 
              tvDitails?.poster_path 
                ? `https://image.tmdb.org/t/p/w500${tvDitails.poster_path}` 
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
              { tvDitails?.original_title }
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
              <Col span={ 6 }>
                <Space direction="vertical" >
                  <Text type="secondary">Rating/Votes</Text>
                  <Text type="secondary">Popularity</Text>
                  <Text type="secondary">Original Title</Text>
                  <Text type="secondary">Genre</Text>
                  <Text type="secondary">Seasons/Episodes</Text>
                </Space>
              </Col>
              <Col span={ 6 }>
                <Space direction="vertical" >
                  <Text>
                    <Tag
                      color="#ff6b01"
                    >
                      { tvDitails?.vote_average }
                    </Tag>
                    /
                    { ' ' }
                    <Tag
                      color="gray"
                    >
                      { tvDitails?.vote_count }
                    </Tag>
                  </Text>
                  <Text strong>{ tvDitails?.popularity }</Text>
                  <Text strong>{ tvDitails?.original_name }</Text>
                  <Text strong>{ tvDitails?.genres.map(({ name }) => name).join(', ') }</Text>
                  <Text>
                    <Tag
                      color="#ff6b01"
                    >
                      { tvDitails?.number_of_seasons }
                    </Tag>
                    /
                    { ' ' }
                    <Tag
                      color="gray"
                    >
                      { tvDitails?.number_of_episodes}
                    </Tag>
                  </Text>
                </Space>
              </Col>
              <Col
                span={ 12 }
                style={{
                  textAlign: "center",
                }}
              >
                { (tvDitails?.production_companies.length !== 0 ) 
                  && tvDitails?.production_companies.filter(({logo_path}) => logo_path).map(({logo_path, name}) => (
                    <Image 
                      key={ logo_path } 
                      alt={ name }
                      src={ 
                        tvDitails?.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${logo_path}` 
                          : null 
                      }
                      preview={false}
                      width={ tvDitails?.production_companies.length > 1 ? 150 : 300}
                      onClick={() => tvDitails?.homepage && window.open(tvDitails?.homepage)}
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
              { tvDitails?.overview }
            </Text>
            <Divider 
              style={{
                backgroundColor: '#ff6b01',
                margin: '0'
              }}
            />
            <Tabs
              defaultActiveKey="1"
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

export default TVDetails;