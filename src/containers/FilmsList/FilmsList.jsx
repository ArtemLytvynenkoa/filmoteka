import { Col, Pagination, Row } from "antd";
import { LoadingIndicator } from "components";
import { 
  useState, 
  useEffect 
} from "react";
import { 
  useDispatch,
} from "react-redux";
import { setGenres } from "redux/genresSlice";
import { apiServices } from "services";
import FilmCard from "./FilmCard";

const FilmList = () => {
  const [ pageNum, setPageNum ] = useState(1);
  const [ isLoading, setIsLoading] = useState(false);
  const [ popularMovies, setPopularMovies ] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    apiServices.fetchGenres().then(data => dispatch(setGenres(data)))
  }, [dispatch]);

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
          <Col span={ 8 } key={ id }>
            <FilmCard 
              title={ title }
              posterPath={ poster_path }
              releaseDate={ release_date }
              genreIds={ genre_ids }
              id={ id }
            />
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
}

export default FilmList;