import React from 'react';
import {
  Input,
  Form,
} from 'antd';
import { TextAreaProps } from 'antd/lib/input';

const { TextArea } = Input;
const { Item } = Form;

const FormTextArea = ({
  field,
  disabled,
  bordered,
  style,
}) => (
  <Item
    name={ field.formItemProps.name }
    rules={ field.formItemProps.rules }
    normalize={ field.formItemProps.normalize }
    label={ field.formItemProps.label }
  >
    <TextArea
      // placeholder={ placeholder }
      disabled={ disabled }
      autoSize={ field.componentProps.autoSize }
      bordered={ bordered }
      placeholder={ field.componentProps.placeholder }
      style={ style }
    />
  </Item>
);

export default FormTextArea;
