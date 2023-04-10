import React from 'react';
import {
  RightHeader,
  LeftHeader,
  Filter,
} from 'components';
import CentralHeader from './CentralHeader';
import { 
  Col, 
  Row, 
  Space
} from 'antd';
import { useSelector } from 'react-redux';
import links from 'links';
import './styles.scss'

const Header = ({ className }) => {
  const { isOpen } = useSelector(state => state.filter.value);
  const activePage = useSelector(state => state.activePage.value);

  const isSearchVisible = activePage === links.filmsPage || activePage === links.tvPage;

  return (
    <header
      className={`header ${className}`}
      style={ {
        width: '100%',
        maxWidth: '1600px',
        height: '230px',
        padding: '1rem 15rem',
        margin: '0 auto',
        backgroundColor: '#000'
      } }
    >
      <Space 
        direction="vertical" 
        size={ 20 }
        style={{ width: '100%' }}
      >
        <Row align="bottom">
          <Col flex="1" >
            <LeftHeader />
          </Col>
          <Col flex="1">
            <CentralHeader />
          </Col>
          <Col flex="1">
            <RightHeader />
          </Col>
        </Row>
        { isOpen && isSearchVisible && <Filter /> }
      </Space>
    </header> 
)};

export default Header;
