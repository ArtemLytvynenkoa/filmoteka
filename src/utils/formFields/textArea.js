import { getTextAreaField } from './formFieldsUtils';

// eslint-disable-next-line import/prefer-default-export
export const description = getTextAreaField({
  componentProps: {
    autoSize: { minRows: 3 },
    disabled: false,
    renderCopyIcon: true,
  },
  formItemProps: {
    name: 'description',
    required: true,
    label: 'Опис товару',
  },
});
