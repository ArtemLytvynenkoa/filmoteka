import { 
  Space, 
  Input,
  Menu,
  Typography,
} from 'antd';
import links from 'links';
import menus from 'menus';
import { 
  useDispatch,
  useSelector 
} from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageNum } from 'redux/pageNumSlice';
import { setSearchQuery } from 'redux/searchQuerySlice';

const { Search } = Input;
const { Text } = Typography;

const CentralHeader = () => {
  const dispatch = useDispatch();

  const activePage = useSelector(state => state.activePage.value);
  const searchQuery = useSelector(state => state.searchQuery.value);

  const isSearchVisible = activePage === links.filmsPage || activePage === links.tvPage;

  return (
    <div
      style={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      } }
    >
      <Space 
        direction="vertical" 
        size={ 35 }
      >
        <Menu
          mode="horizontal"
          selectedKeys={[activePage]}
          style={ {
            boxShadow: 'none',
            borderBottom: 'none',
            background: 'none',
            justifyContent: 'center'
          } }
          onClick={ () => {
            dispatch(setPageNum(1));
            dispatch(setSearchQuery(''));
          }}
          items={ Object.entries(menus).map(([, value]) => ({
            key: value.url,
            label: (
              <>
              <Link 
                to={ value.url } 
                key={ value.title }
              >
                <Text style={{ color: '#ff6b01' }}>
                  { value.title }
                </Text>
              </Link>
              </>
            ),
          })) }
        />
        { isSearchVisible && 
          <Search
            suffix={false}
            placeholder={ 
              activePage === links.filmsPage
                ? 'Film search'
                : 'TV search'
            }
            value={ searchQuery }
            color='#ff6b01'
            className='searchInput'
            onChange={ e => {
              dispatch(setPageNum(1));
              dispatch(setSearchQuery(e.target.value));
            }}
          />
        }
      </Space>
    </div>
  );
};

export default CentralHeader;