import React from 'react';
import {
  RightHeader,
  LeftHeader,
} from 'components';

const Header = () => (
  <header
    style={ {
      maxHeight: '48px',
      height: '48px',
      minHeight: '48px',
      padding: '0 1rem',
      display: 'flex',
      alignContent: 'center',
      borderBottom: '1px solid #d9d9d9',
    } }
  >
    <LeftHeader />
    <RightHeader />
  </header>
);

export default Header;
