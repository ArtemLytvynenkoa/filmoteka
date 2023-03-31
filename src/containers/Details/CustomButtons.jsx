import { useDocument } from "react-firebase-hooks/firestore";

const { Space, Button, message } = require("antd");
const { default: links } = require("links");
const { auth, addingItemToWachedList, addingItemToQueueList, getQueueItemRef, getWatchedItemRef } = require("myFirebase");
const { useState } = require("react");
const { useAuthState } = require("react-firebase-hooks/auth");
const { useParams } = require("react-router-dom");

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

          if (watchedItem) {
            return message.warning("Already in Watched list!")
          };

          setIsLoading(true);

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

              message.success('Done');
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

              message.success('Done');
            } catch (error) {
              message.error(error.message);
            }
          };

          setIsLoading(false);
        }}
      >
        ADD TO WATCHED
      </Button>
      <Button 
        type="primary"
        disabled={ isQueueLoading }
        loading={ isLoading }
        onClick={ async () => {
          if (!user) {
            return message.warning("Login to your profile or register!!!")
          };

          if (queueItem) {
            return message.warning("Already in Queue list!")
          };
          setIsLoading(true);

          if (filmId) {
            try {
              await addingItemToQueueList({
                data: {
                  ...details,
                  type: links.filmsPage
                },
                uid: user.uid, 
                id: `${details.id}-${details.title }`,
              });

              message.success('Done');
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

              message.success('Done');
            } catch (error) {
              message.error(error.message);
            }
          };

          setIsLoading(false);
        }}
      >
        ADD TO QUEUE
      </Button>
    </Space>
  );
};

export default CustomButtons;