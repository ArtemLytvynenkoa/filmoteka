const TrailerTab = ({ trailerKey }) => (
  <div style={{ width: '100%', textAlign: 'center'}}>
    <iframe width="640" height="360"
      src={`https://www.youtube.com/embed/${trailerKey}`}
      title={`${trailerKey}`} 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen
    />
  </div>
);

export default TrailerTab;