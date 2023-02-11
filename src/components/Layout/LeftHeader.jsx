import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import menus from 'menus';

export const LeftHeader = () => (
  <div
    style={ {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      padding: '0',
      flex: '1 1 auto',
    } }
  >
    <Menu
      mode="horizontal"
      defaultActiveFirst
      style={ {
        height: '100%',
        width: 'calc(100% - 8rem - 3rem)',
        boxShadow: 'none',
        borderBottom: 'none',
      } }
      items={ Object.entries(menus).map(([, value]) => ({
        key: value.url,
        label: (
          <Link to={ value.url }>
            { value.title }
          </Link>
        ),
      })) }
    />
  </div>
);

export default LeftHeader;
