import { NotificationBlock } from "components";

const TrailerTab = ({ trailerKey }) => {

  if (!trailerKey) return <NotificationBlock text="Sorry, but we don`t have a trailer for this movie!" />
  
  return (
    <div style={{ width: '100%', textAlign: 'center'}}>
      <iframe 
        className="trailer"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title={`${trailerKey}`} 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
      />
    </div>
  )
};

export default TrailerTab;