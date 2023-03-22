import { 
  Button,
  Col,
  Divider,
  Image, 
  Row, 
  Space,
  Tabs,
  Tag,
  Typography, 
  message
} from "antd";
import { defaultImg } from "images";
import { 
  useNavigate, useParams} from "react-router-dom";
import { 
  CastTab,
  ReviewsTab,
  TrailerTab 
} from "containers";
import links from "links";
import { LeftOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setActivePage } from "redux/activePageSlice";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addingFilmToQueueList, addingFilmToWachedList, auth } from "myFirebase";
import { apiServices } from "services";
import { LoadingIndicator } from "components";

const { Text, Title } = Typography;

const Details = () => {
  const { tvId, filmId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [ isButtonLoading, setIsButtonLoading] = useState(false);

  const [user] = useAuthState(auth);

  const [ isLoading, setIsLoading] = useState(true);
  const [ details, setDetails ] = useState(null);
  const [ cast, setCast ] = useState(null);
  const [ reviews, setReviews ] = useState(null);
  const [ trailerKey, setTrailerKey ] = useState('');

  useEffect(() => {
    if (!filmId) return;
    
    setIsLoading(true);

    apiServices.fetchMovieDetails(filmId).then(details => setDetails(details));
    apiServices.fetchMovieCast(filmId).then(({ cast }) => setCast(cast));
    apiServices.fetchMovieReviews(filmId).then(({ results }) => setReviews(results));
    apiServices.fetchMovieTrailer(filmId).then( ({ results }) => {
      const trailerObj = results.find(({ type }) => type === 'Trailer');

      setTrailerKey(trailerObj && trailerObj.key ? trailerObj.key : '')
    } );
    
    setIsLoading(false);

  }, [filmId]);

  useEffect(() => {
    if (!tvId) return;
    
    setIsLoading(true);

    apiServices.fetchTVDetails(tvId).then(details => setDetails(details));
    apiServices.fetchTVCast(tvId).then(({ cast }) => setCast(cast));
    apiServices.fetchTVReviews(tvId).then(({ results }) => setReviews(results));
    apiServices.fetchTVTrailer(tvId).then( ({ results }) => {
      const trailerObj = results.find(({ type }) => type === 'Trailer');

      setTrailerKey(trailerObj && trailerObj.key ? trailerObj.key : '')
    } );
    
    setIsLoading(false);

  }, [tvId]);

  if (isLoading && !details) {
    return <LoadingIndicator />
  };

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
            onClick={ () => {
              navigate( filmId ? links.filmsPage : links.tvPage)
              dispatch(setActivePage(filmId ? links.filmsPage : links.tvPage))
            } }
          >
            <LeftOutlined /> 
            { ' ' }
            {
              filmId ? 'Back to Films' : 'Back to TV'
            }
          </Button>
        </Col>
        <Col>
        <Space>
            <Button 
              type="primary"
              loading={ isButtonLoading }
              onClick={ async () => {
                setIsButtonLoading(true)

                if (!user) {
                  message.warning("Login to your profile or register!!!")
                } else {
                  try {
                    await addingFilmToWachedList({
                      data: details,
                      uid: user.uid, 
                      filmId: `${details.id}-${details.name || details.title }`,
                    });

                    message.success('Done');
                  } catch (error) {
                    message.error(error.message);
                  }
                }

                setIsButtonLoading(false)
              }}
            >
              ADD TO WATCHED
            </Button>
            <Button 
              type="primary"
              loading={ isButtonLoading }
              onClick={ async () => {
                setIsButtonLoading(true)

                if (!user) {
                  message.warning("Login to your profile or register!!!")
                } else {
                  try {
                    await addingFilmToQueueList({
                      data: details,
                      uid: user.uid, 
                      filmId: `${details.id}-${details.name || details.title }`,
                    });

                    message.success('Done');
                  } catch (error) {
                    message.error(error.message);
                  }
                }
                setIsButtonLoading(false)
              }}
            >
              ADD TO QUEUE
            </Button>
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
              <Col span={ 6 }>
                <Space direction="vertical" >
                  <Text type="secondary">Rating/Votes</Text>
                  <Text type="secondary">Popularity</Text>
                  <Text type="secondary">Original Title</Text>
                  <Text type="secondary">Genre</Text>
                  { tvId && <Text type="secondary">Seasons/Episodes</Text> }
                </Space>
              </Col>
              <Col span={ 6 }>
                <Space direction="vertical" >
                  <Text>
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
                  </Text>
                  <Text strong>{ details?.popularity }</Text>
                  <Text strong>{ details?.original_name }</Text>
                  <Text strong>{ details?.genres.map(({ name }) => name).join(', ') }</Text>
                  { tvId && (
                    <Text>
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
                    </Text>)
                  }
                </Space>
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
                      width={ details?.production_companies.length > 1 ? 150 : 300}
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

export default Details;