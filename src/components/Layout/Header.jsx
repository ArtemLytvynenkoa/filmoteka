import React from 'react';
import {
  RightHeader,
  LeftHeader,
} from 'components';
import './styles.scss'
import CentralHeader from './CentralHeader';
import { Col, Row } from 'antd';

const Header = ({ className }) => (
  <header
    className={`header ${className}`}
    style={ {
      maxWidth: '1600px',
      maxHeight: '230px',
      height: '230px',
      minHeight: '230px',
      padding: '0 15rem',
      // display: 'flex',
    } }
  >
    <Row style={{alignItems: 'end', justifyContent: 'space-around', height: '100%'}}>
      <Col flex="1" style={{height: '100%'}}>
      <LeftHeader />
      </Col>
      <Col flex="1" style={{height: '100%'}}>
      <CentralHeader />
      </Col>
      <Col flex="1" style={{height: '100%'}}>
      <RightHeader />
      </Col>
    </Row>
    
    
    
  </header>
);

export default Header;
