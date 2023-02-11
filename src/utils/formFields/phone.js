import { getPhoneField } from './formFieldsUtils';

export const phone = ({
  disabled,
  label,
  placeholder = 'Введіть номер',
  name,
  addonAfter,
}) => getPhoneField({
  formItemProps: {
    name: name || 'phone',
    required: true,
    label,
  },
  componentProps: {
    disabled,
    placeholder,
    addonAfter,
  },
});

export const phoneNumber = phone({
  disabled: false,
  name: 'phoneNumber',
});
