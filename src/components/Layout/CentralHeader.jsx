import { 
  Space, 
  Input,
  Menu,
  Typography,
} from 'antd';
import links from 'links';
import menus from 'menus';
import { useState } from 'react';
import { 
  useDispatch,
  useSelector 
} from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  resetFilters, 
  setFilterIsOpen 
} from 'redux/filterSlice';
import { setPageNum } from 'redux/pageNumSlice';
import { setSearchQuery } from 'redux/searchQuerySlice';

const { Search } = Input;
const { Text } = Typography;

const CentralHeader = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState('')

  const activePage = useSelector(state => state.activePage.value);

  const isSearchVisible = activePage === links.filmsPage || activePage === links.tvPage;

  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'center'
      } }
    >
      <Space 
        direction="vertical" 
        size={ 35 }
      >
        <Menu
          mode="horizontal"
          selectedKeys={[ activePage ]}
          style={ {
            boxShadow: 'none',
            borderBottom: 'none',
            background: 'none',
            justifyContent: 'center'
          } }
          onClick={ () => {
            dispatch(setPageNum(1));
            dispatch(resetFilters());
            dispatch(setSearchQuery(''));
            dispatch(setFilterIsOpen(false));
            setSearchValue('')
          }}
          items={ Object.entries(menus).map(([, value]) => ({
            key: value.url,
            label: (
              <Link 
                to={ value.url } 
                key={ value.title }
              >
                <Text style={{ color: '#ff6b01' }}>
                  { value.title }
                </Text>
              </Link>
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
            value={ searchValue }
            color='#ff6b01'
            className='searchInput'
            onChange={ e => setSearchValue(e.target.value) }
            onSearch={ value => {
              dispatch(setPageNum(1));
              dispatch(setSearchQuery(value));
              dispatch(resetFilters());
              dispatch(setFilterIsOpen(false))
              setSearchValue('')
            } }
          />
        }
      </Space>
    </div>
  );
};

export default CentralHeader;