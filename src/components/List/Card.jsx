import { 
  Badge,
  Divider,
  Space,
  Typography,
} from "antd";
import { defaultImg } from "images";
import links from "links";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActivePage } from "redux/activePageSlice";
import { 
  getGenresTextArray, 
  getReleaseDate 
} from "utils";

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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navLink = navigateLink !== links.userListPage ? `${navigateLink}/${id}` : `${navigateLink}/${id}-${title}-${type}`

  return (
    <Badge
      count={ rating }
      offset={ [-20, 15] }
    >
      <Space direction="vertical"
        style={{
          textAlign: 'start',
          cursor: 'pointer',
        }}
        onClick={ () => {
          dispatch(setActivePage(''))
          navigate(navLink)
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
    </Badge>
  );
};

export default Card;