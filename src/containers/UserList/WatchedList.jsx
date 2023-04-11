import { 
  LoadingIndicator,
  List 
} from "components";
import links from "links";
import { 
  auth, 
  getFirstList, 
  getNextList, 
  getPrevList,
  getWatchedListRef 
} from "myFirebase";
import {
  useEffect, 
  useState 
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { 
  useDispatch, 
  useSelector 
} from "react-redux";
import { setMoviesGenres, setTVGenres } from "redux/genresSlice";
import { setPageNum } from "redux/pageNumSlice";
import { apiServices } from "services";

const WatchedList = () => {
  const [user] = useAuthState(auth);

  const pageNum = useSelector(state => state.pageNum.value);
  const { moviesGenres, tvGenres } = useSelector(state => state.genres.value);

  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);

  const dispatch = useDispatch();

  const isFetchGenres = (moviesGenres.length === 0) || (tvGenres.length === 0)

  useEffect(() => {
    if (!isFetchGenres) return;

    apiServices.fetchTVGenres().then(data => dispatch(setTVGenres(data)));
    apiServices.fetchMoviesGenres().then(data => dispatch(setMoviesGenres(data)));
  }, [dispatch, isFetchGenres]);

  useEffect(() => {
    if (pageNum !== 1) return;

    setIsLoading(true);

    getFirstList(getWatchedListRef(user.uid)).then(({
      documentSnapshots,
      snapshot
    }) => {
      setLastVisible(documentSnapshots.docs[19]);
      setList({
        total_results: snapshot.data().count,
        results: documentSnapshots.docs.map( item => item.data())
      });
    });
    
    setIsLoading(false)
  }, [pageNum, user.uid]);

  const handleNextClick = async() => {
    setIsLoading(true);

    await getNextList(getWatchedListRef(user.uid), lastVisible).then(({
      documentSnapshots,
      snapshot
    }) => {
      setFirstVisible(documentSnapshots.docs[0]);

      if (documentSnapshots.docs.length === 20) {
        setLastVisible(documentSnapshots.docs[19]);
      };

      setList({
        total_results: snapshot.data().count,
        results: documentSnapshots.docs.map( item => item.data())
      });
    })

    dispatch(setPageNum(pageNum + 1))
    
    setIsLoading(false)
  };

  const handlePrevClick = async() => {
    setIsLoading(true);

    await getPrevList(getWatchedListRef(user.uid), firstVisible).then(({
      documentSnapshots,
      snapshot
    }) => {
      if (pageNum !== 1) {
        setFirstVisible(documentSnapshots.docs[0]);
      }
        setLastVisible(documentSnapshots.docs[19]);

      setList({
        total_results: snapshot.data().count,
        results: documentSnapshots.docs.map( item => item.data())
      });
    })
    
    dispatch(setPageNum(pageNum - 1))

    setIsLoading(false)
  }; 

  if (isLoading || !list) return <LoadingIndicator/>

  return (
    <List 
      data={ {
        ...list, 
        results: list?.results?.map(({ details }) => details)
      } }
      allGenres={ [...tvGenres, ...moviesGenres] }
      navigateLink={ links.userListPage }
      simple={ true }
      handlePrevClick={ handlePrevClick }
      handleNextClick={ handleNextClick }
    />
  );
};

export default WatchedList;