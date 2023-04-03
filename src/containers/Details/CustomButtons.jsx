import { useDocument } from "react-firebase-hooks/firestore";
import { 
  Space, 
  Button, 
  message 
} from "antd";
import links from "links";
import { 
  auth, 
  addingItemToWachedList, 
  addingItemToQueueList, 
  getQueueItemRef, 
  getWatchedItemRef, 
  deleteItemFromWachedList, 
  deleteItemFromQueueList 
} from "myFirebase";
import { 
  useEffect, 
  useState 
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import errorMessages from "errorMessages";

const CustomButtons = ({ details }) => {
  const { tvId, filmId } = useParams();

  const [user] = useAuthState(auth);

  const [ isLoading, setIsLoading] = useState(false);
  

  const [watchedItemValue, isWatchedLoading, watchedError] = useDocument(
    getWatchedItemRef(user?.uid, `${details?.id}-${details?.title || details?.name}`),
  );

  const [queueItemValue, isQueueLoading, queueError] = useDocument(
    getQueueItemRef(user?.uid, `${details?.id}-${details?.title || details?.name}`),
  );
  
  const watchedItem = watchedItemValue?.data();
  const queueItem = queueItemValue?.data();

  useEffect(() => {
    if (watchedError) {
      // console.log(error.code);
      message.error(errorMessages[watchedError.code]);
    }
    if (queueError) {
      // console.log(googleSignInError.code);
      message.error(errorMessages[queueError.code]);
    }
  }, [queueError, watchedError]);

  console.log();
  return (
    <Space>
      <Button 
        type="primary"
        disabled={ isWatchedLoading }
        loading={ isLoading }
        onClick={ async () => {
          if (!user) {
            return message.warning("Login to your profile or register!!!")
          };

          setIsLoading(true);

          if (!watchedItem) {
            if (filmId) {
              try {
                await addingItemToWachedList({
                  data: {
                    ...details,
                    type: links.filmsPage
                  },
                  uid: user.uid, 
                  id: `${details.id}-${details.title}`,
                });
  
                message.success('Added to the Watched list!');
              } catch (error) {
                message.error(error.message);
              }
            };
  
            if (tvId) {
              try {
                await addingItemToWachedList({
                  data: {
                    ...details,
                    type: links.tvPage
                  },
                  uid: user.uid, 
                  id: `${details.id}-${details.name}`,
                });
  
                message.success('Added to the Watched list!');
              } catch (error) {
                message.error(error.message);
              }
            };
          } else {
            if (filmId) {
              try {
                await deleteItemFromWachedList(
                  user.uid, 
                  `${details.id}-${details.title}`,
                );
  
                message.success('Removed from the Watched list!');
              } catch (error) {
                message.error(error.message);
              }
            };
  
            if (tvId) {
              try {
                await deleteItemFromWachedList(
                  user.uid,
                  `${details.id}-${details.name}`,
                );
  
                message.success('Removed from the Watched list!');
              } catch (error) {
                message.error(error.message);
              }
            };
          };

          setIsLoading(false);
        }}
      >
        { watchedItem ? 'REMOVE FROM WATCHED' : 'ADD TO WATCHED' }
      </Button>
      <Button 
        type="primary"
        disabled={ isQueueLoading }
        loading={ isLoading }
        onClick={ async () => {
          if (!user) {
            return message.warning("Login to your profile or register!!!")
          };

          setIsLoading(true);

          if (!queueItem) {
            if (filmId) {
              try {
                await addingItemToQueueList({
                  data: {
                    ...details,
                    type: links.filmsPage
                  },
                  uid: user.uid, 
                  id: `${details.id}-${details.title}`,
                });
  
                message.success('Added to the Queue list!');
              } catch (error) {
                message.error(error.message);
              }
            };
  
            if (tvId) {
              try {
                await addingItemToQueueList({
                  data: {
                    ...details,
                    type: links.tvPage
                  },
                  uid: user.uid, 
                  id: `${details.id}-${details.name}`,
                });
  
                message.success('Added to the Queue list!');
              } catch (error) {
                message.error(error.message);
              }
            };
          } else {
            if (filmId) {
              try {
                await deleteItemFromQueueList(
                  user.uid, 
                  `${details.id}-${details.title}`,
                );
  
                message.success('Removed from the Queue list!');
              } catch (error) {
                message.error(error.message);
              }
            };
  
            if (tvId) {
              try {
                await deleteItemFromQueueList(
                  user.uid,
                  `${details.id}-${details.name}`,
                );
  
                message.success('Removed from the Queue list!');
              } catch (error) {
                message.error(error.message);
              }
            };
          };

          setIsLoading(false);
        }}
      >
        { queueItem ? 'REMOVE FROM QUEUE' : 'ADD TO QUEUE' }
      </Button>
    </Space>
  );
};

export default CustomButtons;