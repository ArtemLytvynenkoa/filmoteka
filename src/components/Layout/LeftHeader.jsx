import React from 'react';
import { Link } from 'react-router-dom';
import links from 'links';
import { logo } from 'images';
import { Typography } from 'antd';
import { setActivePage } from 'redux/activePageSlice';
import { useDispatch } from 'react-redux';
import { useResize } from 'hooks';

const { Title } = Typography

export const LeftHeader = () => {
  const dispatch = useDispatch();

  const windowWidth = useResize();

  return (
    <div
      style={ {
        display: 'flex',
        textAlign: 'center'
      } }
      onClick={ () => dispatch(setActivePage(links.mainPage)) }
    >
      <Link to={ links.mainPage }>
        <img src={ logo } alt='logo' width={ (windowWidth > 768) ? '100px' : '50px' }/>
        { windowWidth > 500 && (
          <Title 
            className='logo-title'
            level={ (windowWidth > 768) ? 1 : 3 }
            style={{ 
              color: '#ff6b01',
              margin: '0'
            }}
          >
            Filmoteka
          </Title>
        )}
      </Link>
    </div>
  )
};

export default LeftHeader;
