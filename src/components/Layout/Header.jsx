import React from 'react';
import {
  RightHeader,
  LeftHeader,
  Filter,
  SearchInput
} from 'components';
import CentralHeader from './CentralHeader';
import { 
  Col, 
  Row, 
  Space
} from 'antd';
import { useSelector } from 'react-redux';
import links from 'links';
import './layout.scss'

const Header = () => {
  const activePage = useSelector(state => state.activePage.value);

  const isSearchVisible = activePage === links.filmsPage || activePage === links.tvPage;

  return (
    <header className='header'>
      <Space 
        direction="vertical"
        className='header-space'
      >
        <Row 
          align={ isSearchVisible ? 'middle' : 'bottom' }
        >
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
        { isSearchVisible && <SearchInput />  }
        { isSearchVisible && <Filter/>  }
      </Space>
    </header> 
)};

export default Header;
