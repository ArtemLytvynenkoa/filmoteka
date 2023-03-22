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
import { setActivePage } from 'redux/activePageSlice';
import { setPageNum } from 'redux/pageNumSlice';
import { setSearchQuery } from 'redux/searchQuerySlice';

const { Search } = Input;
const { Text } = Typography;

const CentralHeader = () => {
  const dispatch = useDispatch();

  const activePage = useSelector(state => state.activePage.value)
  const searchQuery = useSelector(state => state.searchQuery.value)

  const isSearchVisible = activePage === '/films' || activePage === '/tv';

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
          onClick={ ({ key }) => {
            dispatch(setPageNum(1));
            dispatch(setSearchQuery(''));
            dispatch(setActivePage(key));
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
            placeholder={ 
              activePage === links.filmsPage
                ? 'Film search'
                : 'TV search'
            }
            defaultValue={ searchQuery }
            color='#ff6b01'
            className='searchInput'
            // onChange={ e => {
            //   dispatch(setPageNum(1))
            //   dispatch(setSearchQuery(e.currentTarget.value.trim()))}
            // }
            onSearch={ searchQuery => {
              dispatch(setPageNum(1))
              dispatch(setSearchQuery(searchQuery))
            }}
          />
        }
      </Space>
    </div>
  );
};

export default CentralHeader;