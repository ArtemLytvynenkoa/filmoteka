import { Details } from "containers/Details";
import { auth, getQueueItemRef, getWatchedItemRef } from "myFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const { useParams } = require("react-router-dom");

const UserListDetails = () => {
  const [user] = useAuthState(auth);

  const { userListId } = useParams();

  const ref = userListId.split('-')[2] === 'watched' 
    ? getWatchedItemRef(user.uid, userListId) 
    : getQueueItemRef(user.uid, userListId);

  const [value, isLoading, error] = useDocument(ref);

  const data = value?.data();

  console.log(value);

  return (
    <Details 
      details={ data?.details }
      cast={ data?.cast }
      reviews={ data?.reviews }
      trailerKey={ data?.trailerKey }
      isLoading={ isLoading }
    />
    // <div>Hello</div>
  )
};

export default UserListDetails;