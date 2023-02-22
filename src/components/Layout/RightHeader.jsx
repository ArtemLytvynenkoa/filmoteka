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

export const RightHeader = () => {
  const [user] = useAuthState(auth);

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
              <UserOutlined style={{ fontSize: '24px' }}/>
            </Link>
          </Button>
          <Button 
            type="primary"
            onClick={ () => signOut(auth) }
          >
            Вийти
          </Button>
        </Space>
      }
      { !user && 
        <Space>
          <Button type="primary">
            <Link to={ links.signInPage }>Увійти</Link>
          </Button>
          <Button type="primary">
            <Link to={ links.signUpPage }>Зареєструватися</Link>
          </Button>
        </Space>
      }
    </div>
  );
};

export default RightHeader;
