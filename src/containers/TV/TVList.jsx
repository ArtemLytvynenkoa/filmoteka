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
import { apiServices } from "services";
import { setTVGenres } from "redux/tvGenresSlice";
import TVCard from "./TVCard";

const TVList = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ popularTV, setPopularTV ] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.searchQuery.value);
  const pageNum = useSelector(state => state.pageNum.value);

  useEffect(() => {
    apiServices.fetchTVGenres().then(data => dispatch(setTVGenres(data)));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
 
      apiServices.fetchSearchTV({ searchQuery, pageNum}).then(data => setPopularTV(data));
      return setIsLoading(false);
    };

    if (!searchQuery) {
      setIsLoading(true);

      apiServices.fetchPopularTV(pageNum).then(data => setPopularTV(data));
      return setIsLoading(false);
    }
  }, [pageNum, searchQuery]);

  if (isLoading || !popularTV) return <LoadingIndicator />;

  const maxItemCount = 10000;

  return (
    <div className="mainContent">
      { popularTV.results.length === 0 
        ? 'Sorry!' 
        : (
          <>
            <Pagination 
              totalResults={
                popularTV.total_results > maxItemCount 
                  ? maxItemCount 
                  : popularTV.total_results
              }
            />
            <Row 
              gutter={ [ 8, 8 ] } 
            >
            { popularTV.results.map(({ 
              name,
              poster_path,
              first_air_date,
              genre_ids,
              id,
              vote_average
            }) => (
              <Col span={ 6 } key={ id }>
                <TVCard 
                  title={ name }
                  posterPath={ poster_path }
                  releaseDate={ first_air_date }
                  genreIds={ genre_ids }
                  id={ id }
                  rating={ vote_average }
                />
              </Col>
            )) }
          </Row>
          <Pagination 
              totalResults={
                popularTV.total_results > maxItemCount 
                  ? maxItemCount 
                  : popularTV.total_results
              }
            />
          </>
        )
      }
    </div>
  )
}

export default TVList;