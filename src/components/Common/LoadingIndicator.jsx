import React from 'react';
import {
  Col,
  Row,
  Spin,
} from 'antd';

const LoadingInicator = () => (
  <Row 
    style={ { 
      height: '100%',
      padding: '50px'
    } } 
    justify="center" 
    align="middle"
  >
    <Col>
      <Spin spinning />
    </Col>
  </Row>
);

export default LoadingInicator;
