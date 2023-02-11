import React from 'react';
import {
  Col,
  Row,
  Spin,
} from 'antd';

const LoadingInicator = () => (
  <Row style={ { height: '100%' } } justify="center" align="middle">
    <Col>
      <Spin spinning />
    </Col>
  </Row>
);

export default LoadingInicator;
