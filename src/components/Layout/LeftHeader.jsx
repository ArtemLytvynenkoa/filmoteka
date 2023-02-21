import React from 'react';
import { Link } from 'react-router-dom';
import links from 'links';
import { logo } from 'images';
import { Typography } from 'antd';

const { Title } = Typography

export const LeftHeader = () => (
  <div
    style={ {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      height: '100%',
      flex: '1 1 auto',
    } }
  >
    <Link to={ links.filmsPage }>
      <img src={ logo } alt='logo' width='100px'/>
      <Title 
        level={ 1 } 
        style={{ color: '#ff6b01' }}
      >
        Filmoteka
      </Title>
    </Link>
  </div>
);

export default LeftHeader;
