import {
  Col,
  Form,
  Row,
} from 'antd';
import {
  FormUpload,
  FormSelect,
  FormInput,
  FormTextArea,
  FormDatePicker,
  FormInputNumber,
  FormCheckbox,
  FormRadioButtonGroup,
  FormTelephoneInput,
} from 'components';
import { isFieldDisabled } from 'utils';
import formComponentTypes from 'formComponentTypes';
import React from 'react';

const { Item } = Form;

const renderFormFields = fields => fields.map((field, index) => {
  if (Array.isArray(field)) {
    return (
      <Row gutter={ [16, 16] } key={ `fieldsBlock${index}` }>
        { field.map(item => (
          <Col
            key={ (Array.isArray(item.formItemProps.name) ? item.formItemProps.name.join('.') : item.formItemProps.name) }
            style={ { width: `${100 / field.length}%` } }
          >
            { renderFormFields([item]) }
          </Col>
        )) }
      </Row>
    );
  }

  if ('formItemProps' in field) {
    return (
      <Item
        noStyle
        key={ (Array.isArray(field.formItemProps.name) ? field.formItemProps.name.join('.') : field.formItemProps.name) }
        dependencies={ field.formItemProps.dependencies || [] }
      >
        { ({ getFieldValue }) => {
          const disabled = isFieldDisabled(field, getFieldValue);

          switch (field.type) {
            case formComponentTypes.INPUT:
              return <FormInput field={ field } disabled={ disabled } />;

            case formComponentTypes.TEXTAREA:
              return <FormTextArea field={ field } disabled={ disabled } />;

            case formComponentTypes.DATE:
              return <FormDatePicker field={ field } disabled={ disabled } />;

            case formComponentTypes.NUMBER:
              return <FormInputNumber field={ field } disabled={ disabled } />;

            case formComponentTypes.SELECT:
              return <FormSelect field={ field } disabled={ disabled } />;

            case formComponentTypes.PASSWORD:
              return <FormInput field={ field } disabled={ disabled } />;

            case formComponentTypes.CHECKBOX:
              return <FormCheckbox field={ field } disabled={ disabled } />;

              // case FormComponentTypes.SWITCH:
              //   return <FormSwitch field={ field } disabled={ disabled } />;

            case formComponentTypes.PHONE:
              return <FormTelephoneInput field={ field } disabled={ disabled } />;

            case formComponentTypes.UPLOAD:
              return <FormUpload field={ field } />;

            case formComponentTypes.RADIOBUTTONGROUP:
              return <FormRadioButtonGroup field={ field } disabled={ disabled } />;

            default:
              return null;
          }
        } }
      </Item>
    );
  }

  if (!('component' in field)) {
    return (
      <Item key={ field.key }>
        { field }
      </Item>
    );
  }

  return (
    <Item
      key={ field.key }
      dependencies={ [] }
    >
      { ({ getFieldValue }) => {
        if (field.hiddenByPropName && getFieldValue(field.hiddenByPropName)) {
          return null;
        }

        return field.component;
      } }
    </Item>
  );
});

export default renderFormFields;
