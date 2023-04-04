import { AuthErrorCodes } from 'firebase/auth';

const errorMessages = {
  [AuthErrorCodes.USER_DELETED]: 'Wrong password or login!',
  [AuthErrorCodes.INVALID_PASSWORD]: 'Wrong password or login!',
  [AuthErrorCodes.INVALID_EMAIL]: 'This email address not found!',
  [AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER]: 'Too many requests, try again later!',
  [AuthErrorCodes.EMAIL_EXISTS]: 'A user with this email address already exists!',
  [AuthErrorCodes.POPUP_CLOSED_BY_USER]: 'The popup window was closed by the user!',
  [AuthErrorCodes.INTERNAL_ERROR]: 'You did not fill in one of the fields!',
  [AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN]: 'Re-authorize!',
};

export default errorMessages;
