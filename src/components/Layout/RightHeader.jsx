import {
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Space,
} from 'antd';
import { auth } from 'myFirebase';
import { signOut } from 'firebase/auth';
import links from 'links';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { 
  useDispatch, 
  useSelector 
} from 'react-redux';
import { setActivePage } from 'redux/activePageSlice';
import { setPageNum } from 'redux/pageNumSlice';

export const RightHeader = () => {
  const [user] = useAuthState(auth);

  const activePage = useSelector(state => state.activePage.value);

  const dispatch = useDispatch()

  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'flex-end',
        height: '100%',
      } }
    >
      { user &&
        <Space size={ 20 }>
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
              style={{ 
                fontSize: '24px',
                color: '#ff6b01'
              }}
            />
          </Dropdown>
          
          <Button 
            type="primary"
            onClick={ () => {
              signOut(auth)
            } }
          >
            Sign out
          </Button>
        </Space>
      }
      { !user && 
        <Space>
          <Button 
            type="primary"
            onClick={ () => dispatch(setActivePage('')) }
          >
            <Link to={ links.signInPage }>Sign in</Link>
          </Button>
          <Button 
            type="primary"
            onClick={ () => dispatch(setActivePage('')) }
          >
            <Link to={ links.signUpPage }>Sign Up</Link>
          </Button>
        </Space>
      }
    </div>
  );
};

export default RightHeader;
