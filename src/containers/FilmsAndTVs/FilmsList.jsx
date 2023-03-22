import { LoadingIndicator } from "components";
import { List } from "containers";
import links from "links";
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

const FilmList = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ movies, setMovies ] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.searchQuery.value);
  const pageNum = useSelector(state => state.pageNum.value);
  const allGenres= useSelector(state => state.moviesGenres.value);

  useEffect(() => {
    apiServices.fetchMoviesGenres().then(data => dispatch(setMoviesGenres(data)));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
 
      apiServices.fetchSearchMovies({ searchQuery, pageNum}).then(data => setMovies(data));
      return setIsLoading(false);
    };

    if (!searchQuery) {
      setIsLoading(true);

      apiServices.fetchPopularMovies(pageNum).then(data =>  setMovies(data));
      return setIsLoading(false);
    }
  }, [pageNum, searchQuery]);

  if (isLoading || !movies) return <LoadingIndicator />;

  return (
    <List
      data={ movies }
      allGenres={ allGenres }
      navigateLink={ links.filmsPage }
    />
  )
}

export default FilmList;