import { 
  Badge,
  Divider,
  Space,
  Typography,
} from "antd";
import { defaultImg } from "images";
import links from "links";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActivePage } from "redux/activePageSlice";
import { 
  getGenresTextArray, 
  getReleaseDate 
} from "utils";
import './styles.scss';

const { Text } = Typography;

const Card = ({
  title,
  posterPath,
  releaseDate,
  genreIds,
  rating,
  id,
  allGenres,
  navigateLink,
  type
}) => {
  const dispatch = useDispatch();

  const navLink = navigateLink !== links.userListPage ? `${navigateLink}/${id}` : `${navigateLink}/${id}-${title}-${type}`

  return (
    <Badge
      count={ rating?.toFixed(1) }
      offset={ [-20, 15] }
    >
      <Space 
        direction="vertical"
        style={{
          textAlign: 'start'
        }}
        onClick={ () => {
          dispatch(setActivePage(''))
        } }
      >
        <Link
          to={ navLink } 
          state={{ from: navigateLink }}
        >
          <img
            className="card-image"
            src={ posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : defaultImg } 
            alt={ title }
          />
        </Link>
        <Space direction="vertical" >
          <Text
            className="card-movie-name"
            copyable
            ellipsis={{
              tooltip: true
            }}
          >
            { title?.toUpperCase() }
          </Text>
          <Space size={ 0 }>
            <Text
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
            <Text style={{ color: '#ff6b01' }}>
              { getReleaseDate(releaseDate) }
            </Text>
          </Space>
        </Space>
      </Space>
    </Badge>
  );
};

export default Card;