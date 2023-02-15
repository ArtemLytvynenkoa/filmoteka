import {
  Col,
   Divider,
   Pagination,
   Row, 
   Space,
   Typography
} from "antd";
import { LoadingIndicator } from "components";
import { 
  useEffect,
  useState
} from "react";
import { apiServices } from "services";
import { setGenres } from "redux/genresSlice";
import { useDispatch, useSelector } from "react-redux";
import { getGenresTextArray, getReleaseDate } from "utils";
import { defaultImg } from "images";

const { Text } = Typography;

const MainPage = () => {
  const [ pageNum, setPageNum ] = useState(1);
  const [ isLoading, setIsLoading] = useState(false);
  const [ popularMovies, setPopularMovies ] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    apiServices.fetchGenres().then(data => dispatch(setGenres(data)))
  }, [dispatch]);

  const allGenres = useSelector(state => state.genres.value);

  useEffect(() => {
    setIsLoading(true);
    apiServices.fetchPopularMovies(pageNum).then(data => setPopularMovies(data));
    setIsLoading(false);
  }, [pageNum]);

  if (isLoading || !popularMovies) return <LoadingIndicator />;

  return (
    <> 
      <Row gutter={ 16 }>
        { popularMovies.results.map(({ 
          title,
          poster_path,
          release_date,
          genre_ids,
          id
        }) => (
          <Col span={ 8 } key={id}>
            <Space direction="vertical">
              <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImg} alt={title}/>
              <Text>{title}</Text>
              <Space>
                <Text>{getGenresTextArray(genre_ids, allGenres)}</Text>
                <Divider type="vertical"/>
                <Text>{getReleaseDate(release_date)}</Text>
              </Space>
            </Space>
          </Col>
        )) }
      </Row>
      <Pagination
        style={{ marginLeft: 'auto' }}
        total={ popularMovies.total_results }
        pageSize={ 20 }
        showSizeChanger={ false }
        showQuickJumper
        onChange={ page => setPageNum(page) }
      />
    </>
  )
};

export default MainPage;