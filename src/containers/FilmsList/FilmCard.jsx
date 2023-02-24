import { 
  Divider,
  Space,
  Typography,
} from "antd";
import { defaultImg } from "images";
import links from "links";
import { useSelector } from "react-redux";
import { 
  getGenresTextArray, 
  getReleaseDate 
} from "utils";

const {Text} = Typography;

const FilmCard = ({
  title,
  posterPath,
  releaseDate,
  genreIds,
  id,
}) => {
  const allGenres = useSelector(state => state.moviesGenres.value);

  return(
    <Space direction="vertical"
      style={{
        textAlign: 'start',
        cursor: 'pointer',
      }}
      onClick={ () => {
        window.open(`${links.filmsPage}/${id}`);
      } }
    >
      <img 
        src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : defaultImg} alt={title}
        style={{
          width: '300px',
          height: '450px',
          borderRadius: '10px',
        }}
      />
      <Text
        style={{
          width: '300px'
        }} 
        copyable
        ellipsis={{
          tooltip: true
        }}
      >
        { title.toUpperCase() }
      </Text>
      <Space size={ 0 }>
        <Text 
          style={{ 
            color: '#ff6b01',
            maxWidth: '250px'
          }}
          ellipsis={{
          tooltip: true
          }}
        >
          { getGenresTextArray(genreIds, allGenres) }
        </Text>
        <Divider 
          type="vertical"
          style={{
            backgroundColor: '#ff6b01'
          }}
        />
        <Text 
          style={{ 
            color: '#ff6b01'
          }}
        >
          { getReleaseDate(releaseDate) }
        </Text>
      </Space>
    </Space>
  );
};

export default FilmCard;