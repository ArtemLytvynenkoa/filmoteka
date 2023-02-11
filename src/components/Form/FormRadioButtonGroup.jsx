import React from 'react';
import {
  Radio,
  Form,
} from 'antd';

const { Item } = Form;
const { Group } = Radio;

const FormRadioButtonGroup = ({ field, disabled }) => (
  <Item
    name={ field.formItemProps.name }
    rules={ field.formItemProps.rules }
    label={ field.formItemProps.label }
    normalize={ field.formItemProps.normalize }
  >
    <Group
      disabled={ disabled }
      optionType="button"
      buttonStyle="solid"
      options={ field.componentProps.options }
    />
  </Item>
);

export default FormRadioButtonGroup;
