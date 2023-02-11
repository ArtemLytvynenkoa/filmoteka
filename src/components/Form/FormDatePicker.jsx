import React from 'react';
import {
  Form,
  DatePicker,
} from 'antd';

const { Item } = Form;

const FormDatePicker = ({
  field,
  disabled,
}) => (
  <Item
    name={ field.formItemProps.name }
    rules={ field.formItemProps.rules }
    label={ field.formItemProps.label }
    normalize={ field.formItemProps.normalize }
  >
    <DatePicker
      style={ { width: '100%' } }
      format={ field.componentProps.format || 'DD.MM.YYYY' }
      getPopupContainer={ node => node.parentNode }
      placeholder={ field.componentProps.placeholder }
      disabled={ disabled }
      picker={ field.componentProps.picker }
      disabledDate={ field.componentProps.disabledDate }
    />
  </Item>
);

export default FormDatePicker;
