import {
  FilterOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Dropdown,
  Space,
} from 'antd';
import { auth } from 'myFirebase';
import { signOut } from 'firebase/auth';
import links from 'links';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from 'redux/activePageSlice';
import { setPageNum } from 'redux/pageNumSlice';
import { setFilterIsOpen } from 'redux/filterSlice';

export const RightHeader = () => {
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();

  const activePage = useSelector(state => state.activePage.value);
  
  const { isOpen } = useSelector(state => state.filter.value);

  const isSearchVisible = activePage === links.filmsPage || activePage === links.tvPage;

  const style = { 
    fontSize: '24px',
    color: '#ff6b01',
    padding: '10px 0'
  };

  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'flex-end'
      } }
    >
      { user &&
        <Space size={ 10 }>
          { isSearchVisible &&
            <FilterOutlined
              onClick={ () => dispatch(setFilterIsOpen(!isOpen)) }
              className='header-icons'
              style={ style }
            />
          }
          <Dropdown
            trigger={ ['hover'] }
            menu={{
              theme: "dark",
              style: {
                padding: '0.7rem',
                marginTop: '0.5rem',
              },
              onClick:  () => {
                dispatch(setActivePage(links.userProfilePage))
                dispatch(setPageNum(1))
              },
              items: [{
                key: 'profile',
                label: (
                  <Link to={ links.userProfilePage }>
                    Profile
                  </Link>
                )
              }, {
                key: 'usserList',
                label: (
                  <Link to={ links.userListPage }>
                    User List
                  </Link>
                )
              }]
            }}
          >
            <UserOutlined 
              style={ style }
            />
          </Dropdown>
          <LogoutOutlined 
            onClick={ () => {
              signOut(auth)
            } }
            style={ style }
          />
        </Space>
      }
      { !user && 
        <Space>
          { isSearchVisible &&
            <FilterOutlined
              onClick={ () => dispatch(setFilterIsOpen(!isOpen)) }
              className='header-icons'
              style={ style }
            />
          }
          <Link to={ links.signInPage }>
            <LoginOutlined 
              onClick={ () => dispatch(setActivePage('')) }
              style={ style }
            />
          </Link>
          <Link to={ links.signUpPage }>
            <UserAddOutlined 
              onClick={ () => dispatch(setActivePage('')) }
              style={ style }
            />
          </Link>
        </Space>
      }
    </div>
  );
};

export default RightHeader;
