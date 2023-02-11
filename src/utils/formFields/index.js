import {
  userName,
  email,
  password,
  confirmPass,
  goodsName,
  productCode,
  deliveryAddress,
} from './input';
import {
  price,
  orderPrice,
} from './number';
import { description } from './textArea';
import { phoneNumber } from './phone';

const orderForm = {
  userName,
  phoneNumber,
  deliveryAddress,
  orderPrice,
};

const signInForm = {
  email,
  password,
};

const profileForm = {
  userName,
  phoneNumber,
  email,
  password,
  confirmPass,
};

const productAdditionFormFields = {
  goodsName,
  price,
  description,
  productCode,
};

export {
  signInForm,
  profileForm,
  productAdditionFormFields,
  orderForm,
};
