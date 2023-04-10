import { 
  LoadingIndicator, 
  List 
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
import links from "links";
import { setActivePage } from "redux/activePageSlice";
import { setTVGenres } from "redux/genresSlice";

const TVList = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ TV, setTV ] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.searchQuery.value);
  const pageNum = useSelector(state => state.pageNum.value);
  const { tvGenres } = useSelector(state => state.genres.value);
  const { filters } = useSelector(state => state.filter.value);

  const isFilters = Object.values(filters).some( item => item );
  
  useEffect(() => {
    if (pageNum !== 1) return;

    apiServices.fetchTVGenres().then(data => dispatch(setTVGenres(data)));
    dispatch(setActivePage(links.tvPage));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
 
      apiServices.fetchSearchTV({ searchQuery, pageNum}).then(data => setTV(data));
      return setIsLoading(false);
    };

    if (!searchQuery && isFilters ) {
      setIsLoading(true);
 
      apiServices.fetchFilterTV({
        pageNum: pageNum,
        genre: filters?.genre,
        year: filters?.year,
        vote: filters?.vote,
      }).then(data => setTV(data));

      return setIsLoading(false);
    }

    if (!searchQuery && !isFilters) {
      setIsLoading(true);

      apiServices.fetchPopularTV(pageNum).then(data => setTV(data));
      return setIsLoading(false);
    }
  }, [filters, isFilters, pageNum, searchQuery]);

  if (isLoading || !TV) return <LoadingIndicator />;

  return (
    <List 
      data={ TV }
      allGenres={ tvGenres }
      navigateLink={ links.tvPage }
    />
  )
}

export default TVList;