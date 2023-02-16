import React from 'react';
import {
  RightHeader,
  LeftHeader,
} from 'components';
import './styles.scss'

const Header = () => (
  <header
    className='header'
    style={ {
      maxWidth: '1600px',
      maxHeight: '230px',
      height: '230px',
      minHeight: '230px',
      padding: '0 2rem',
      display: 'flex',
      alignContent: 'center',
    } }
  >
    <LeftHeader />
    <RightHeader />
  </header>
);

export default Header;
