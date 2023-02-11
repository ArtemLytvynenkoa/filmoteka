import React from 'react';
import {
  Select,
  Form,
} from 'antd';

const { Option } = Select;

const { Item } = Form;

const FormSelect = ({
  field: {
    formItemProps: {
      name,
      rules,
      label,
      normalize,
    },
    componentProps: {
      placeholder,
      options,
    },
  },
  disabled,
}) => (
  <Item
    name={ name }
    rules={ rules }
    label={ label }
    normalize={ normalize }
  >
    <Select
      style={ { width: '100%' } }
      dropdownMatchSelectWidth={ false }
      getPopupContainer={ node => node.parentNode }
      placeholder={ placeholder }
      disabled={ disabled }
    >
      { options?.map(({
        key,
        label,
      }) => (
        <Option key={ key } value={ key }>
          { label }
        </Option>
      )) }
    </Select>
  </Item>
);

export default FormSelect;
