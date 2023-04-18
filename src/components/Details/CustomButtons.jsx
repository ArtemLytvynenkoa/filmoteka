import { useDocument } from "react-firebase-hooks/firestore";
import { 
  Space, 
  Button, 
  message, 
  Typography
} from "antd";
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
import errorMessages from "errorMessages";
import { 
  useNavigate, 
  useParams 
} from "react-router-dom";
import links from "links";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

const CustomButtons = ({ 
  details,
  cast,
  reviews,
  trailerKey,
}) => {
  const [user] = useAuthState(auth);

  const [ isLoading, setIsLoading] = useState(false);
  
  const { userListId } = useParams();

  const navigate = useNavigate(); 

  const [watchedItemValue, isWatchedLoading, watchedError] = useDocument(
    getWatchedItemRef(user?.uid, `${details?.id}-${details?.title || details?.name}-watched`),
  );

  const [queueItemValue, isQueueLoading, queueError] = useDocument(
    getQueueItemRef(user?.uid, `${details?.id}-${details?.title || details?.name}-queue`),
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
  
  return (
    <Space>
      <Button
        className="btn custom-btn"
        type="primary"
        disabled={ isWatchedLoading }
        loading={ isLoading }
        onClick={ async () => {
          if (!user) {
            return message.warning("Login to your profile or register!!!")
          };

          setIsLoading(true);

          if (!watchedItem) {
            try {
              await addingItemToWachedList({
                data: {
                  details: {
                    ...details,
                    type: 'watched'
                  },
                  cast,
                  reviews,
                  trailerKey,
                },
                uid: user.uid, 
                id: `${details.id}-${details.title || details.name}-watched`,
              });

              message.success('Added to Watched list!');
            } catch (error) {
              message.error(error.message);
            }
          } else {
            try {
              await deleteItemFromWachedList(
                user.uid, 
                `${details.id}-${details.title || details.name}-watched`,
              );

              message.success('Removed from Watched list!');

              userListId && navigate(links.userListPage);
            } catch (error) {
              message.error(error.message);
            };
          };

          setIsLoading(false);
        }}
      >
        { watchedItem 
          ? <Text className="button-text"><DeleteOutlined /> FROM WATCHED</Text>
          : <Text className="button-text">ADD TO WATCHED</Text>
        }
      </Button>
      <Button
        className="btn custom-btn"
        type="primary"
        disabled={ isQueueLoading }
        loading={ isLoading }
        onClick={ async () => {
          if (!user) {
            return message.warning("Login to your profile or register!!!")
          };

          setIsLoading(true);

          if (!queueItem) {
            try {
              await addingItemToQueueList({
                data: {
                  details: {
                    ...details,
                    type: "queue"
                  },
                  cast,
                  reviews,
                  trailerKey,
                },
                uid: user.uid, 
                id: `${details.id}-${details.title || details.name}-queue`,
              });

              message.success('Added to Queue list!');
            } catch (error) {
              message.error(error.message);
            }
          } else {
            try {
              await deleteItemFromQueueList(
                user.uid, 
                `${details.id}-${details.title || details.name}-queue`,
              );

              message.success('Removed from Queue list!');

              userListId && navigate(links.userListPage);
            } catch (error) {
              message.error(error.message);
            }
          };

          setIsLoading(false);
        }}
      >
        { queueItem 
          ? <Text className="button-text"><DeleteOutlined /> FROM QUEUE</Text>
          : <Text className="button-text">ADD TO QUEUE</Text>
        }
      </Button>
    </Space>
  );
};

export default CustomButtons;