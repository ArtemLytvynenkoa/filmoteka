import React from 'react';
import {
  Form,
  InputNumber,
} from 'antd';

const { Item } = Form;

const FormInputNumber = ({ field, disabled }) => (
  <Item
    name={ field.formItemProps.name }
    rules={ field.formItemProps.rules }
    label={ field.formItemProps.label }
    normalize={ field.formItemProps.normalize }
  >
    <InputNumber
      style={ { width: '100%' } }
      disabled={ disabled }
      min={ field.componentProps.min }
    />
  </Item>
);

export default FormInputNumber;
