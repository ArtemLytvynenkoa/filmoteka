import { Details } from "components";
import links from "links";
import { 
  useEffect, 
  useState 
} from "react";
import { useParams } from "react-router-dom";
import { apiServices } from "services";

const TVDetails = () => {
  const { tvId } = useParams();

  const [ isLoading, setIsLoading] = useState(true);
  const [ details, setDetails ] = useState(null);
  const [ cast, setCast ] = useState(null);
  const [ reviews, setReviews ] = useState(null);
  const [ trailerKey, setTrailerKey ] = useState('');

  useEffect(() => {
    if (!tvId) return;
    
    setIsLoading(true);

    apiServices.fetchTVDetails(tvId).then(details => setDetails(details));
    apiServices.fetchTVCast(tvId).then(({ cast }) => setCast(cast));
    apiServices.fetchTVReviews(tvId).then(({ results }) => setReviews(results));
    apiServices.fetchTVTrailer(tvId).then( ({ results }) => {
      const trailerObj = results.find(({ type }) => type === 'Trailer');

      setTrailerKey(trailerObj && trailerObj.key ? trailerObj.key : '')
    } );
    
    setIsLoading(false);

  }, [tvId]);

  return (
    <Details 
      details={ details }
      cast={ cast }
      reviews={ reviews }
      trailerKey={ trailerKey }
      isLoading={ isLoading }
      navigateLink={ links.tvPage }
    />
  )
};

export default TVDetails;