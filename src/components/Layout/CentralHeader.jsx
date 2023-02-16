import { 
  Space, 
  Input, 
} from 'antd';
import menus from 'menus';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPageNum } from 'redux/pageNumSlice';
import { setSearchQuery } from 'redux/searchQuerySlice';

const { Search } = Input;

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
      <Space direction="vertical" size={ 50 } style={{ textAlign: "center" }}>
        <Space size={ 30 }>
          { Object.entries(menus).map(([, value]) => (
            <Link to={ value.url } key={ value.title }>
              { value.title }
            </Link>
            ))
          }
        </Space>
        <Search
          placeholder="Search"
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