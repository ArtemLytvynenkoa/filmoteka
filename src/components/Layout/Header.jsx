import React from 'react';
import {
  RightHeader,
  LeftHeader,
} from 'components';
import './styles.scss'
import CentralHeader from './CentralHeader';

const Header = ({ className }) => (
  <header
    className={`header ${className}`}
    style={ {
      maxWidth: '1600px',
      maxHeight: '230px',
      height: '230px',
      minHeight: '230px',
      padding: '0 2rem',
      display: 'flex',
      marginRight: 'auto',
      marginLeft: 'auto',
    } }
  >
    <LeftHeader />
    <CentralHeader />
    <RightHeader />
  </header>
);

export default Header;
