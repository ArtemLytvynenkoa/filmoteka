import { 
  Col,
  Row 
} from "antd";
import { 
  LoadingIndicator, 
  Pagination 
} from "components";
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
          <div className="mainContent">
            <Row 
              gutter={ [ 8, 8 ] } 
            >
            { popularMovies.results.map(({ 
              title,
              poster_path,
              release_date,
              genre_ids,
              id
            }) => (
              <Col span={ 6 } key={ id }>
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
            totalResults={ popularMovies.total_results }
          />
        </div>
      )}
    </>
  )
}

export default FilmList;