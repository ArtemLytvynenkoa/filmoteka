import { 
  Col,
  Divider,
  Image, 
  Row, 
  Space,
  Tag,
  Typography 
} from "antd";
import { LoadingIndicator } from "components";
import { defaultImg } from "images";
import { 
  useEffect, 
  useState 
} from "react";
import { useParams } from "react-router-dom";
import { apiServices } from "services";

const { Text, Title } = Typography;

const FilmDitails = () => {
  const { filmId } = useParams();

  const [ isLoading, setIsLoading] = useState(true);
  const [ filmDitails, setFilmDitails ] = useState(null);
  // const [ cast, setCast ] = useState(null);
  // const [ reviews, setReviews ] = useState(null);
  // const [ trailerKey, setTrailerKey ] = useState('');

  useEffect(() => {
    if (!filmId) return;
    
    setIsLoading(true);

    apiServices.fetchMovieDetails(filmId).then(ditails => setFilmDitails(ditails));
    // apiServices.fetchMovieCast(filmId).then(({ cast }) => setCast(cast));
    // apiServices.fetchMovieReviews(filmId).then(({ results }) => setReviews(results));
    // apiServices.fetchMovieTrailer(filmId).then( ({ results }) => {
    //   const trailerObj = results.find(({ type }) => type === 'Trailer');

    //   setTrailerKey(trailerObj && trailerObj.key ? trailerObj.key : '')
    // } );
    
    setIsLoading(false);

  }, [filmId]);

  console.log(filmDitails);

  if (isLoading && !filmDitails) {
    return <LoadingIndicator />
  }

  return (
    <div className="mainContent">
      <Row
        style={{
          padding: '50px 0',
          width: '100%'
        }}
      >

        {/* <Button onClick={ () => {
           setIsOpen(true)
        } }>Open</Button>
        <Button onClick={ () => {
           setIsOpen(false)
        } }>Close</Button>
        {
          isOpen && 
          <iframe width="640" height="360"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title={`${trailerKey}`} frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
          />
        } */}
        <Col span={ 6 }>
          <Image 
            alt={ filmDitails?.title }
            src={ 
              filmDitails?.poster_path 
                ? `https://image.tmdb.org/t/p/w500${filmDitails.poster_path}` 
                : defaultImg 
            }
            preview={false}
            width={ 300 }
            height={ 450 }
            style={{ borderRadius: '15px' }}
          />
        </Col>
        <Col span={ 18 }>
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
                <Image 
                  alt={ filmDitails?.production_companies[0].name }
                  src={ 
                    filmDitails?.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${filmDitails.production_companies[0].logo_path}` 
                      : null 
                  }
                  preview={false}
                  width={ 300 }
                  onClick={ () => window.open(filmDitails?.homepage)}
                  style={{ cursor: "pointer" }}
                />
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
          </Space>
        </Col>
      </Row>
    </div>
  )
};

export default FilmDitails;