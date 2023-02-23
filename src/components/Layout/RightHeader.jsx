import {
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Space,
} from 'antd';
import { auth } from 'myFirebase';
import { signOut } from 'firebase/auth';
import links from 'links';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setActivePage } from 'redux/activePageSlice';

export const RightHeader = () => {
  const [user] = useAuthState(auth);

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
          <Button
            type="link"
            style={ { padding: '0' } }
          >
            <Link to={ links.userProfilePage }>
              <UserOutlined 
                style={{ fontSize: '24px' }}
                onClick={ () => dispatch(setActivePage('')) }
              />
            </Link>
          </Button>
          <Button 
            type="primary"
            onClick={ () => {
              dispatch(setActivePage(links.filmsPage))
              signOut(auth)
            } }
          >
            <Link to={ links.filmsPage }>Sign out</Link>
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
