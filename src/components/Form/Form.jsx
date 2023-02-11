import React from 'react';
import {
  Button,
  Form as AntdForm,
} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import renderFormFields from './renderFormFields';

const Form = ({
  // required
  fields,
  onSubmit,
  // optional
  children,
  footer,
  form,
  initialValues,
  buttonText = 'Зберегти',
  onValuesChange,
  isSubmitButtonVisible = true,
  isLoading,
  // layout
  style,
  layout = 'vertical',
  labelCol = 24,
  wrapperCol = 24,
}) => (
  <AntdForm
    style={ style }
    form={ form }
    labelCol={ { span: labelCol } }
    wrapperCol={ { span: wrapperCol } }
    onFinish={ onSubmit }
    initialValues={ initialValues }
    layout={ layout }
    scrollToFirstError
    onValuesChange={ onValuesChange }
  >
    { children }
    { fields && renderFormFields(fields.filter(Boolean)) }
    { isSubmitButtonVisible &&
      <FormItem>
        <Button
          type="primary"
          htmlType="submit"
          loading={ isLoading }
          block
        >
          { buttonText }
        </Button>
      </FormItem>
    }
    { footer }
  </AntdForm>
);

export default Form;
