import React from 'react';
import {
  Form,
  Checkbox,
} from 'antd';

const { Item } = Form;

const FormCheckbox = ({ field, disabled }) => (
  <Item
    name={ field.formItemProps.name }
    rules={ field.formItemProps.rules }
    label={ field.formItemProps.label }
    valuePropName="checked"
  >
    <Checkbox disabled={ disabled }>
      { field.componentProps.children }
    </Checkbox>
  </Item>
);

export default FormCheckbox;
