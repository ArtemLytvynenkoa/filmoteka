import { 
  Divider,
  Space,
  Typography,
} from "antd";
import { defaultImg } from "images";
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
  const allGenres = useSelector(state => state.genres.value);

  return(
  <Space direction="vertical">
    <img 
      src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : defaultImg} alt={title}
      style={{
        width: '300px',
        height: '450px'
      }}
    />
    <Text>{title}</Text>
    <Space>
      <Text>{getGenresTextArray(genreIds, allGenres)}</Text>
      <Divider type="vertical"/>
      <Text>{getReleaseDate(releaseDate)}</Text>
    </Space>
  </Space>
)};

export default FilmCard;