import { LoadingIndicator } from "components";
import { List } from "containers/Common";
import links from "links";
import { 
  auth, 
  getFirstList, 
  getNextList, 
  getPrevList, 
  getQueueListRef} from "myFirebase";
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
import { setPageNum } from "redux/pageNumSlice";

const QueueList = () => {
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

    dispatch(setActivePage(''));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (pageNum !== 1) return;

    setIsLoading(true);

    getFirstList(getQueueListRef(user.uid)).then(({
      documentSnapshots,
      snapshot
    }) => {
      const index = documentSnapshots.docs.length - 1;

      setLastVisible(documentSnapshots.docs[index]);
      setList({
        total_results: snapshot.data().count,
        results: documentSnapshots.docs.map( item => item.data())
      });
    });
    
    setIsLoading(false)
  }, [pageNum, user.uid]);

  const handleNextClick = async() => {
    setIsLoading(true);

    await getNextList(getQueueListRef(user.uid), lastVisible).then(({
      documentSnapshots,
      snapshot
    }) => {
      setFirstVisible(documentSnapshots.docs[0]);

      const index = documentSnapshots.docs.length - 1;
      // if (documentSnapshots.docs.length === 20) {
        setLastVisible(documentSnapshots.docs[index]);
      // };

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

    await getPrevList(getQueueListRef(user.uid), firstVisible).then(({
      documentSnapshots,
      snapshot
    }) => {
      const index = documentSnapshots.docs.length - 1;
      
      setFirstVisible(documentSnapshots.docs[0]);
      setLastVisible(documentSnapshots.docs[index]);
      setList({
        total_results: snapshot.data().count,
        results: documentSnapshots.docs.map( item => item.data())
      });
    })
    
    dispatch(setPageNum(pageNum - 1))

    setIsLoading(false)
  }; 

  if (isLoading || !list) {
    return <LoadingIndicator/>
  }

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

export default QueueList;