import { apiServices } from "services";
import { 
  useEffect, 
  useState 
} from "react";
import { LoadingIndicator } from "components";
import { Slider } from ".";
import { useDispatch, useSelector } from "react-redux";
import { setMoviesGenres, setTVGenres } from "redux/genresSlice";
import links from "links";
import { Divider, Typography } from "antd";

const { Title } = Typography;

const MainPage = () => {
  const [ isLoading, setIsLoading] = useState(false);
  const [ movies, setMovies ] = useState(null);
  const [ tv, setTv ] = useState(null);

  const { moviesGenres, tvGenres } = useSelector(state => state.genres.value);

  const isFetchGenres = (moviesGenres.length === 0) || (tvGenres.length === 0)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFetchGenres) return;

    apiServices.fetchTVGenres().then(data => dispatch(setTVGenres(data)));
    apiServices.fetchMoviesGenres().then(data => dispatch(setMoviesGenres(data)));
  }, [dispatch, isFetchGenres]);

  useEffect(() => {
    if (!movies && !tv) {
      setIsLoading(true);
    
      apiServices.fetchTrendingMovies().then(data => setMovies(data));
      apiServices.fetchTrendingTV().then(data => setTv(data));
    
      setIsLoading(false);
    };
  }, [movies, tv])

  if (isLoading || !movies) return <LoadingIndicator />;

  return (
    <div className="mainPage">
      <Title type="secondary">
        Film trends
      </Title>
      <Slider 
        items={ movies }
        navigateLink={ links.filmsPage }
      />
      <Divider 
        style={{
          borderColor: 'rgb(0 0 0 / 45%)',
          borderTopWidth: '2px',
          margin: '35px 0 20px' 
        }}
      />
      <Title type="secondary">
        TV trends
      </Title>
      <Slider 
        items={ tv }
        navigateLink={ links.tvPage }
      />
      <Divider 
        style={{
          borderColor: 'rgb(0 0 0 / 45%)',
          borderTopWidth: '2px',
          margin: '35px 0 20px' 
        }}
      />
    </div>
    // <div>
    //   hello
    // </div>
  );
};

export default MainPage;