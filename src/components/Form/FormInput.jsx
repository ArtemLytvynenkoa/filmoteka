import React from 'react';
import {
  Form,
  Input,
} from 'antd';

const { Item } = Form;

const FormInput = ({
  field,
  disabled,
}) => (
  <Item
    name={ field.formItemProps.name }
    rules={ field.formItemProps.rules }
    label={ field.formItemProps.label }
    normalize={ field.formItemProps.normalize }
  >
    <Input
      disabled={ disabled }
      type={ field.componentProps.type }
      prefix={ field.componentProps.prefix }
      placeholder={ field.componentProps.placeholder }
      size={ field.componentProps.size }
      style={ field.componentProps.style }
      maxLength={ field.componentProps.maxLength }
      bordered={ field.componentProps.bordered }
    />
  </Item>
);

export default FormInput;
