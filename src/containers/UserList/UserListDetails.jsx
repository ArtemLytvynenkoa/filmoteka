import { message } from "antd";
import { Details } from "components";
import errorMessages from "errorMessages";
import links from "links";
import { 
  auth, 
  getQueueItemRef, 
  getWatchedItemRef 
} from "myFirebase";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const { useParams } = require("react-router-dom");

const UserFilmDetails = () => {
  const [user] = useAuthState(auth);

  const { userFilmId } = useParams();

  const ref = userFilmId.split('-')[2] === 'watched' 
    ? getWatchedItemRef(user.uid, userFilmId) 
    : getQueueItemRef(user.uid, userFilmId);

  const [value, isLoading, error] = useDocument(ref);

  const data = value?.data();

  useEffect(() => {
    if (error) {
      // console.log(error.code);
      message.error(errorMessages[error.code]);
    }
  }, [error]);

  return (
    <Details 
      details={ data?.details }
      cast={ data?.cast }
      reviews={ data?.reviews }
      trailerKey={ data?.trailerKey }
      isLoading={ isLoading }
      navigateLink={ links.userListPage }
    />
  )
};

export default UserFilmDetails;