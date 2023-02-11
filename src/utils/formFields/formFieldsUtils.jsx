import { MailOutlined } from '@ant-design/icons';
import { parsePhoneNumber } from 'libphonenumber-js';
import formComponentTypes from 'formComponentTypes';
import React from 'react';

// rules
export const isPhoneValidRule = {
  required: true,
  validator: (_, value) => {
    try {
      const phone = parsePhoneNumber(value);

      if (phone.isValid()) {
        return Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(new Error('Incorrect Phone'));
    }

    return Promise.reject(new Error('Incorrect Phone'));
  },
};

const requiredRule = {
  required: true,
  message: 'Необхідне поле',
};

const emailRule = {
  type: 'email',
  message: 'Невалідний Email',
};

const getField = type => ({
  formItemProps,
  componentProps,
}) => ({
  formItemProps: {
    ...formItemProps,
    rules: formItemProps.required ? [requiredRule].concat(formItemProps.rules || []) : formItemProps.rules,
  },
  componentProps,
  type,
});

export const getInputField = getField(formComponentTypes.INPUT);

export const getPassword = getField(formComponentTypes.PASSWORD);

export const getEmailField = ({
  isLabelVisible,
  isRequired,
  disabled,
  defaultValue,
}) => getInputField({
  formItemProps: {
    name: 'email',
    label: isLabelVisible ? 'Пошта' : undefined,
    normalize: value => value.trim().toLowerCase(),
    rules: isRequired ? [emailRule, requiredRule] : [emailRule],
  },
  componentProps: {
    placeholder: 'Пошта',
    disabled,
    type: 'email',
    prefix: !isLabelVisible && <MailOutlined />,
    defaultValue,
  },
});

export const getTextAreaField = getField(formComponentTypes.TEXTAREA);

export const getRadioButtonGroupField = getField(formComponentTypes.RADIOBUTTONGROUP);

export const getNumberField = getField(formComponentTypes.NUMBER);

export const getDatePickerField = getField(formComponentTypes.DATE);

export const getSelectField = getField(formComponentTypes.SELECT);

export const getCheckboxField = getField(formComponentTypes.CHECKBOX);

export const getPhoneField = getField(formComponentTypes.PHONE);

export const getUploadField = getField(formComponentTypes.UPLOAD);
