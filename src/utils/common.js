export const isFieldDisabled = (field, getFieldValue) => {
  if (field.componentProps.disabled && typeof (field.componentProps.disabled) === 'function') {
    return field.componentProps.disabled(getFieldValue);
  }

  if (field.componentProps.disabled && typeof (field.componentProps.disabled) === 'boolean') {
    return field.componentProps.disabled;
  }

  return false;
};
