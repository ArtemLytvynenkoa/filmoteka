import React from 'react';
import { Link } from 'react-router-dom';
import links from 'links';
import { logo } from 'images';

export const LeftHeader = () => (
  <div
    style={ {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      marginLeft: '208px',
      padding: '0',
      flex: '1 1 auto',
    } }
  >
    <Link to={ links.filmsPage }>
      <img src={ logo } alt='logo' width='100px'/>
      Filmoteka
    </Link>
  </div>
);

export default LeftHeader;
