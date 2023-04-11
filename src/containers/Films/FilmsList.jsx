import { 
  LoadingIndicator, 
  List 
} from "components";
import links from "links";
import { 
  useState, 
  useEffect 
} from "react";
import { 
  useDispatch,
  useSelector,
} from "react-redux";
import { setActivePage } from "redux/activePageSlice";
import { setMoviesGenres } from "redux/genresSlice";
import { apiServices } from "services";

const FilmList = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ movies, setMovies ] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.searchQuery.value);
  const pageNum = useSelector(state => state.pageNum.value);
  const { moviesGenres } = useSelector(state => state.genres.value);
  const { filters } = useSelector(state => state.filter.value);

  const isFilters = Object.values(filters).some( item => item );
  
  useEffect(() => {
    if (moviesGenres.length > 0) return;

    apiServices.fetchMoviesGenres().then(data => dispatch(setMoviesGenres(data)));
    dispatch(setActivePage(links.filmsPage));
  }, [dispatch, moviesGenres]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
 
      apiServices.fetchSearchMovies({ searchQuery, pageNum}).then(data => setMovies(data));

      return setIsLoading(false);
    };

    if (!searchQuery && isFilters ) {
      setIsLoading(true);
 
      apiServices.fetchFilterMovies({
        pageNum: pageNum,
        genre: filters?.genre,
        year: filters?.year,
        vote: filters?.vote,
      }).then(data => setMovies(data));

      return setIsLoading(false);
    }

    if (!searchQuery && !isFilters) {
      setIsLoading(true);

      apiServices.fetchPopularMovies(pageNum).then(data =>  setMovies(data));

      return setIsLoading(false);
    }
  }, [filters, isFilters, pageNum, searchQuery]);

  if (isLoading || !movies) return <LoadingIndicator />;

  return (
    <List
      data={ movies }
      allGenres={ moviesGenres }
      navigateLink={ links.filmsPage }
    />
  )
}

export default FilmList;