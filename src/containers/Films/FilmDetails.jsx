import { Details } from "components";
import links from "links";
import { 
  useEffect, 
  useState 
} from "react";
import { useParams } from "react-router-dom";
import { apiServices } from "services";

const FilmDetails = () => {
  const { filmId } = useParams();

  const [ isLoading, setIsLoading] = useState(true);
  const [ details, setDetails ] = useState(null);
  const [ cast, setCast ] = useState(null);
  const [ reviews, setReviews ] = useState(null);
  const [ trailerKey, setTrailerKey ] = useState('');

  useEffect(() => {
    if (!filmId) return;
    
    setIsLoading(true);

    apiServices.fetchMovieDetails(filmId).then(details => setDetails(details));
    apiServices.fetchMovieCast(filmId).then(({ cast }) => setCast(cast));
    apiServices.fetchMovieReviews(filmId).then(({ results }) => setReviews(results));
    apiServices.fetchMovieTrailer(filmId).then( ({ results }) => {
      const trailerObj = results.find(({ type }) => type === 'Trailer');

      setTrailerKey(trailerObj && trailerObj.key ? trailerObj.key : '')
    } );
    
    setIsLoading(false);

  }, [filmId]);

  return (
    <Details 
      details={ details }
      cast={ cast }
      reviews={ reviews }
      trailerKey={ trailerKey }
      isLoading={ isLoading }
      navigateLink={ links.filmsPage }
    />
  )
};

export default FilmDetails;