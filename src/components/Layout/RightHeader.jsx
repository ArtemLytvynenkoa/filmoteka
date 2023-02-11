import {
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Dropdown,
  Menu,
  Space,
} from 'antd';
// import { auth } from 'fire';
// import { signOut } from 'firebase/auth';
import links from 'links';
import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

export const RightHeader = () => {
  // const [user] = useAuthState(auth);

  return (
    <div
      style={ {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        textAlign: 'right',
        flex: '0 1 auto',
      } }
    >
      {/* { user && */}
        <Space size={ 20 }>
          <Button
            type="link"
            style={ { padding: '0' } }
          >
            {/* <Link to={ `${links.users}/${user.uid}` }> */}
              <UserOutlined />
            {/* </Link> */}
          </Button>
          <Button
            type="link"
            style={ { padding: '0' } }
          >
            <Link to={ links.basket }>
              <ShoppingCartOutlined />
            </Link>
          </Button>
          {/* { admins.includes(user.uid) && */}
            <Dropdown
              trigger={ ['hover'] }
              overlay={
                <Menu
                  theme="dark"
                  style={ {
                    padding: '0.7rem',
                    marginTop: '0.5rem',
                  } }
                  items={ [{
                    key: 'goods',
                    label: (
                      <Link to={ links.goods }>
                        Товари
                      </Link>
                    ),
                  }, {
                    key: 'orders',
                    label: (
                      <Link to={ links.orders }>
                        Замовлення
                      </Link>
                    ),
                  }, {
                    key: 'users',
                    label: (
                      <Link to={ links.users }>
                        Користувачі
                      </Link>
                    ),
                  }] }
                />
              }
            >
              <SettingOutlined />
            </Dropdown>
          {/* } */}
          <Button 
            type="primary"
            // onClick={ () => signOut(auth) }
          >
            Вийти
          </Button>
        </Space>
      {/* }
      { !user && */}
        <Space>
          <Button type="primary">
            <Link to={ links.signIn }>Увійти</Link>
          </Button>
          <Button type="primary">
            <Link to={ links.signUp }>Зареєструватися</Link>
          </Button>
        </Space>
      {/* } */}
    </div>
  );
};

export default RightHeader;
