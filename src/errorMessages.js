import { AuthErrorCodes } from 'firebase/auth';

const errorMessages = {
  [AuthErrorCodes.USER_DELETED]: 'Невірний Пароль Або Логін',
  [AuthErrorCodes.INVALID_PASSWORD]: 'Невірний Пароль Або Логін',
  [AuthErrorCodes.INVALID_EMAIL]: 'This email address not found!',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Забагато запитів, спробуйте пізніше',
  [AuthErrorCodes.EMAIL_EXISTS]: 'Користувач з такою електронною адресою вже існує',
  [AuthErrorCodes.POPUP_CLOSED_BY_USER]: 'Випливаюче вікно було закрите користувачем',
  [AuthErrorCodes.INTERNAL_ERROR]: 'Ви не заповнили одне з полів',
  [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]: 'Пройдіть повторну авторизацію',
};

export default errorMessages;
