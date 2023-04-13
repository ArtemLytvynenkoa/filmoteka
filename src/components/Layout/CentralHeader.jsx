import { 
  Space,
  Menu,
  Typography,
} from 'antd';
import menus from 'menus';
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

const { Text } = Typography;

const CentralHeader = () => {
  const dispatch = useDispatch();

  const activePage = useSelector(state => state.activePage.value);

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
      </Space>
    </div>
  );
};

export default CentralHeader;