import { LoadingIndicator } from "components";
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
import links from "links";
import { List } from "containers";
import { setActivePage } from "redux/activePageSlice";

const TVList = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ TV, setTV ] = useState(null);

  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.searchQuery.value);
  const pageNum = useSelector(state => state.pageNum.value);
  const allGenres= useSelector(state => state.tvGenres.value);
  
  useEffect(() => {
    apiServices.fetchTVGenres().then(data => dispatch(setTVGenres(data)));
    dispatch(setActivePage(links.tvPage));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
 
      apiServices.fetchSearchTV({ searchQuery, pageNum}).then(data => setTV(data));
      return setIsLoading(false);
    };

    if (!searchQuery) {
      setIsLoading(true);

      apiServices.fetchPopularTV(pageNum).then(data => setTV(data));
      return setIsLoading(false);
    }
  }, [pageNum, searchQuery]);

  if (isLoading || !TV) return <LoadingIndicator />;

  return (
    <List 
      data={ TV }
      allGenres={ allGenres }
      navigateLink={ links.tvPage }
    />
  )
}

export default TVList;