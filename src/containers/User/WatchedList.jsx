import { LoadingIndicator } from "components";
import { List } from "containers/Common";
import links from "links";
import { 
  auth, 
  getFirstWatchedList, 
  getNextWatchedList,
  getPrevWatchedList,
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
import { setActivePage } from "redux/activePageSlice";
import { setMoviesGenres } from "redux/moviesGenresSlice";
import { setPageNum } from "redux/pageNumSlice";
import { setTVGenres } from "redux/tvGenresSlice";
import { apiServices } from "services";

const WatchedList = () => {
  const [user] = useAuthState(auth);

  const pageNum = useSelector(state => state.pageNum.value);
  const moviesGenres = useSelector(state => state.moviesGenres.value);
  const tvGenres = useSelector(state => state.tvGenres.value);

  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [firstVisible, setFirstVisible] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pageNum !== 1) return;

    apiServices.fetchTVGenres().then(data => dispatch(setTVGenres(data)));
    apiServices.fetchMoviesGenres().then(data => dispatch(setMoviesGenres(data)));

    dispatch(setActivePage(''));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (pageNum !== 1) return;

    setIsLoading(true);

    getFirstWatchedList(getWatchedListRef(user.uid)).then(({
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

    await getNextWatchedList(getWatchedListRef(user.uid), lastVisible).then(({
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

    await getPrevWatchedList(getWatchedListRef(user.uid), firstVisible).then(({
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

  if (isLoading) return <LoadingIndicator/>

  return (
    <List 
      data={ list }
      allGenres={ [...tvGenres, ...moviesGenres] }
      navigateLink={ links.userListPage }
      simple={ true }
      handlePrevClick={ handlePrevClick }
      handleNextClick={ handleNextClick }
      isLoading={ isLoading }
    />
    // <div>Hello</div>
  );
};

export default WatchedList;