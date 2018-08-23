import {
  LOAD_VALIDATE_INPUT_EMAILS,
  LOAD_VALIDATE_INPUT_EMAILS_ERROR,
  LOAD_VALIDATE_INPUT_EMAILS_SUCCESS,
} from './constants';

// VALIDATE_INPUT_EMAIL LOAD

export function loadValidateInputEmails(email) {
  return {
    type: LOAD_VALIDATE_INPUT_EMAILS,
    email,
  };
}

export function validateInputEmailsLoaded(availableEmail) {
  return {
    type: LOAD_VALIDATE_INPUT_EMAILS_SUCCESS,
    availableEmail,
  };
}

export function loadValidateInputEmailsError(error) {
  return {
    type: LOAD_VALIDATE_INPUT_EMAILS_ERROR,
    error,
  };
}
// END VALIDATE_INPUT_EMAIL LOAD
