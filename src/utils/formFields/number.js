import { getNumberField } from './formFieldsUtils';

export const price = getNumberField({
  componentProps: { disabled: false },
  formItemProps: {
    name: 'price',
    label: 'Ціна, ₴',
    required: true,
  },
});

export const orderPrice = getNumberField({
  componentProps: { disabled: true },
  formItemProps: {
    name: 'orderPrice',
    label: 'Ціна замовдення, ₴',
    required: true,
  },
});
