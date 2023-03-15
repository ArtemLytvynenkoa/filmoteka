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
import { setMoviesGenres } from "redux/moviesGenresSlice";
import { apiServices } from "services";
import FilmCard from "./FilmCard";

const FilmList = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ popularMovies, setPopularMovies ] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.searchQuery.value);
  const pageNum = useSelector(state => state.pageNum.value);

  useEffect(() => {
    apiServices.fetchMoviesGenres().then(data => dispatch(setMoviesGenres(data)));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
 
      apiServices.fetchSearchMovies({ searchQuery, pageNum}).then(data => setPopularMovies(data));
      return setIsLoading(false);
    };

    if (!searchQuery) {
      setIsLoading(true);

      apiServices.fetchPopularMovies(pageNum).then(data =>  setPopularMovies(data));
      return setIsLoading(false);
    }
  }, [pageNum, searchQuery]);

  if (isLoading || !popularMovies) return <LoadingIndicator />;

  const maxItemCount = 10000;

  return (
    <div className="mainContent">
      { popularMovies.results.length === 0 
        ? 'Sorry!' 
        : (
          <>
            <Pagination  
              totalResults={ 
                popularMovies.total_results > maxItemCount 
                  ? maxItemCount 
                  : popularMovies.total_results
              }
            />
            <Row 
              gutter={ [ 8, 8 ] } 
            >
            { popularMovies.results.map(({ 
              title,
              poster_path,
              release_date,
              genre_ids,
              id,
              vote_average,
            }) => (
              <Col span={ 6 } key={ id }>
                <FilmCard 
                  title={ title }
                  posterPath={ poster_path }
                  releaseDate={ release_date }
                  genreIds={ genre_ids }
                  id={ id }
                  rating={ vote_average }
                />
              </Col>
            )) }
          </Row>
          <Pagination  
            totalResults={ 
              popularMovies.total_results > maxItemCount 
                ? maxItemCount 
                : popularMovies.total_results
            }
          />
          </>
        )
      }
    </div>
  )
}

export default FilmList;