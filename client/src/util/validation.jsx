import { EMAIL_VALIDATE, NUMBER_VALIDATE, PASSWORD_VALIDATE } from "../constants"

export function isEmail(value){
  if (EMAIL_VALIDATE.test(value)) {
    return true
  }
  else return false
}

export function isNumber(value){
  if(NUMBER_VALIDATE.test(value)){
    return true
  }
  else return false
}

export function isPassword(value){
  if(PASSWORD_VALIDATE.test(value)){
    return true
  }
  else return false
}