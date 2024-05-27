export const EMAIL_VALIDATE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const NUMBER_VALIDATE = /^[0-9]+$/
// export const PASSWORD_VALIDATE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
export const PASSWORD_VALIDATE = /^[A-Za-z]\w{6,32}$/

//6- 20 ký tự có chứa ít nhất 1 chữ Hoa, 1 số, 1 chữ thường

export const SERVER_URL = "http://localhost:8000"