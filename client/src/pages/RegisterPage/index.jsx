import { ErrorMessage, Field, Form, Formik} from 'formik'
import React, { useRef, useState } from 'react'
import { isEmail, isPassword } from '../../util/validation'
import './styles.scss'
import { Link, useNavigate } from 'react-router-dom'
import { ErrMsg, SuccessMsg } from '../../util/Notify/Notification'
import { registerUser } from '../../redux/requestApi'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'


export const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialValues = { username: '', email: '', password: '', repassword: '', }
  const register = useSelector((state) => state.auth.register);
  const validate = (values) => {
    let err = {}
    if (!values.username) {
      err.username = 'Vui lòng nhập tên'
    }
    if (!values.email) {
      err.email = 'Vui lòng nhập email'
    } else if (!isEmail(values.email)) {
      err.email = 'Email không chính xác'
    }
    if (!values.password) {
      err.password = 'Vui lòng nhập mật khẩu'
    } else if (!isPassword(values.password)) {
      // err.password = 'Mật khẩu từ 6-20 ký tự và chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
      err.password = 'Mật khẩu từ 6-32 và ký tự đầu tiên phải là ký tự in hoa'
    }
    if (!values.repassword) {
      err.repassword = 'Vui lòng nhập lại mật khẩu'
    }
    else if (values.repassword != values.password) {
      err.repassword = 'Mật khẩu nhập lại không chính xác'
    }
    return err
  }
  
  const handleRegister = async (values) => {
    const newUser = {
      email: values.email,
      password: values.password,
      username: values.username
    };
    registerUser(newUser,dispatch,navigate);
    
  }
 
  const emailInput = useRef()
  return (
    <div style={{margin: 50}}>
      {register.error? ErrMsg("Register failed. Please try again!!!"):""}
      <div>
        <div className='register__form-container'>
          <div className='register__form-header'>
            <div>Đăng ký</div>
          </div>
          <Formik className='register__form'
            initialValues={initialValues}
            onSubmit={handleRegister}
            validate={validate}
          >
            <Form className='register__form'>
              <div className="register__form-group">
                <label htmlFor="username">Tên</label>
                <Field placeholder="example1" type="text" id='username' name='username'></Field>
                <ErrorMessage name='username'>
                  {(err) => <div className='register__form-error-message'>{err}</div>}
                </ErrorMessage>
              </div>

              <div className="register__form-group">
                <label htmlFor="email">Email</label>
                <Field placeholder="example1@gmail.com" type="text" id='email' name='email' />
                <ErrorMessage name='email'>
                  {(err) => <div className='register__form-error-message'>{err}</div>}
                </ErrorMessage>
              </div>

              <div className="register__form-group">
                <label htmlFor="password">Mật khẩu</label>
                <Field placeholder="example1" type="password" id='password' name='password' />
                <ErrorMessage name='password'>
                  {(err) => <div className='register__form-error-message'>{err}</div>}
                </ErrorMessage>
              </div>

              <div className="register__form-group">
                <label htmlFor="repassword">Nhập lại mật khẩu</label>
                <Field placeholder="example1" type="password" id='repassword' name='repassword' />
                <ErrorMessage name='repassword'>
                  {(err) => <div className='register__form-error-message'>{err}</div>}
                </ErrorMessage>
              </div>
              <button type='submit' >Đăng ký</button>
              <br />
              <p>Đã có tài khoản <Link to="/login">Đăng nhập</Link></p>
            </Form>

          </Formik>

        </div>


      </div>
    </div>

  )
}
