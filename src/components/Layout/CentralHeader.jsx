import { 
  Space, 
  Input,
  Menu,
  Typography, 
} from 'antd';
import menus from 'menus';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageNum } from 'redux/pageNumSlice';
import { setSearchQuery } from 'redux/searchQuerySlice';

const { Search } = Input;
const { Text } = Typography;

const CentralHeader = () => {
  const dispatch = useDispatch();

  return (
    <div
      style={ {
        display: 'flex',
        alignItems: "flex-end",
        height: '100%',
        padding: '0 0 25px',
        flex: '1 1 auto',
      } }
    >
      <Space direction="vertical" size={ 35 } style={{ textAlign: "center" }}>
        <Menu
          mode="horizontal"
          defaultActiveFirst
          style={ {
            boxShadow: 'none',
            borderBottom: 'none',
            background: 'none',
            color: '#ff6b01',
            justifyContent: 'center'
          } }
          items={ Object.entries(menus).map(([, value]) => ({
            key: value.url,
            label: (
              <Link to={ value.url } key={ value.title }>
                <Text style={{ color: '#ff6b01' }}>
                  { value.title }
                </Text>
              </Link>
            ),
          })) }
        />
        <Search
          placeholder="Search"
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
      </Space>
    </div>
  );
};

export default CentralHeader;