import { 
  Col, 
  Pagination, 
  Row 
} from "antd";
import { LoadingIndicator } from "components";
import { 
  useState, 
  useEffect 
} from "react";
import { 
  useDispatch,
  useSelector,
} from "react-redux";
import { setGenres } from "redux/genresSlice";
import { apiServices } from "services";
import FilmCard from "./FilmCard";
import { setPageNum } from "redux/pageNumSlice";

const FilmList = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ popularMovies, setPopularMovies ] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.searchQuery.value);
  const pageNum = useSelector(state => state.pageNum.value);

  useEffect(() => {
    apiServices.fetchGenres().then(data => dispatch(setGenres(data)));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
 
      apiServices.fetchSearchMovies({ searchQuery, pageNum}).then(data => setPopularMovies(data));
      return setIsLoading(false);
    };

    if (!searchQuery) {
      setIsLoading(true);

      apiServices.fetchPopularMovies(pageNum).then(data => setPopularMovies(data));
      return setIsLoading(false);
    }
  }, [pageNum, searchQuery]);

  if (isLoading || !popularMovies) return <LoadingIndicator />;

  return (
    <>
      { popularMovies.results.length === 0 
        ? 'Sorry!' 
        : (
          <>
            <Row gutter={ [ 16, 16 ] }>
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
            current={ pageNum }
            total={ popularMovies.total_results }
            pageSize={ 20 }
            showSizeChanger={ false }
            showQuickJumper
            onChange={ page => dispatch(setPageNum(page)) }
          /> 
        </>
      )}
    </>
  )
}

export default FilmList;