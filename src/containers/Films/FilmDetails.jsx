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
  TrailerTab } from "containers";
import links from "links";
import { LeftOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const FilmDitails = () => {
  const { filmId } = useParams();

  const [ isLoading, setIsLoading] = useState(true);
  const [ filmDitails, setFilmDitails ] = useState(null);
  const [ cast, setCast ] = useState(null);
  const [ reviews, setReviews ] = useState(null);
  const [ trailerKey, setTrailerKey ] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!filmId) return;
    
    setIsLoading(true);

    apiServices.fetchMovieDetails(filmId).then(ditails => setFilmDitails(ditails));
    apiServices.fetchMovieCast(filmId).then(({ cast }) => setCast(cast));
    apiServices.fetchMovieReviews(filmId).then(({ results }) => setReviews(results));
    apiServices.fetchMovieTrailer(filmId).then( ({ results }) => {
      const trailerObj = results.find(({ type }) => type === 'Trailer');

      setTrailerKey(trailerObj && trailerObj.key ? trailerObj.key : '')
    } );
    
    setIsLoading(false);

  }, [filmId]);

  if (isLoading && !filmDitails) {
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
            onClick={ () => navigate(links.filmsPage) }
          >
            <LeftOutlined /> 
            { ' ' }
            Back to Films
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
            alt={ filmDitails?.title }
            src={ 
              filmDitails?.poster_path 
                ? `https://image.tmdb.org/t/p/w500${filmDitails.poster_path}` 
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
              { filmDitails?.original_title }
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
                </Space>
              </Col>
              <Col span={ 6 }>
                <Space direction="vertical" >
                  <Text>
                    <Tag
                      color="#ff6b01"
                    >
                      { filmDitails?.vote_average }
                    </Tag>
                    /
                    { ' ' }
                    <Tag
                      color="gray"
                    >
                      { filmDitails?.vote_count }
                    </Tag>
                  </Text>
                  <Text strong>{ filmDitails?.popularity }</Text>
                  <Text strong>{ filmDitails?.original_title }</Text>
                  <Text strong>{ filmDitails?.genres.map(({ name }) => name).join(', ') }</Text>
                </Space>
              </Col>
              <Col
                span={ 12 }
                style={{
                  textAlign: "center",
                }}
              >
                { (filmDitails?.production_companies.length !== 0 ) 
                  && filmDitails?.production_companies.filter(({logo_path}) => logo_path).map(({logo_path, name}) => (
                    <Image
                      key={ logo_path } 
                      alt={ name }
                      src={ 
                        filmDitails?.poster_path 
                          ? `https://image.tmdb.org/t/p/w500${logo_path}` 
                          : null 
                      }
                      preview={false}
                      width={ filmDitails?.production_companies.length > 1 ? 150 : 300}
                      onClick={ () => filmDitails?.homepage && window.open(filmDitails?.homepage)}
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
              { filmDitails?.overview }
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

export default FilmDitails;