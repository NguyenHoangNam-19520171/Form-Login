import React, { useEffect, useState } from "react";
import WaveImg from "./../../assets/img/Login/wave.png";
import CarImg from "./../../assets/img/Login/car_1.svg";
import "./styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { ErrMsg } from "../../util/Notify/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/requestApi";
const initialUser = {
  username: "",
  password: "",
  err: "",
  success: "",
};

axios.defaults.withCredentials = true;
function LoginPage() {
 
  const [user, setUser] = useState(initialUser);
  const error = useSelector((state) => state.auth.login?.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const newUser = {
      username: user.username,
      password: user.password,
    }
    loginUser(newUser, dispatch, navigate);
  };

  useEffect(() => {
    let inputs = document.querySelectorAll(".form-input");
    function focusFunc() {
      let parent = this.parentNode.parentNode;
      parent.classList.add("focus");
    }
    function blurFunc() {
      let parent = this.parentNode.parentNode;
      if (this.value == "" || this.value == null) {
        parent.classList.remove("focus");
      }
    }
    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
    });
    inputs[0].focus();
  }, []);
  return (
    <div
      style={{
        marginTop: -24,
      }}
    >
      <img src={WaveImg} alt="" className="wave"></img>
      <div className="container">
        <img src={CarImg} alt="" className="img" />
        <div className="login">
          <form action="">
            <div className="title">LOGIN</div>
            {error? ErrMsg("Login Failed. Please try again!!!"):""}
            <div className="form-group">
              <div className="form-icon">
                <i className="fas fa-user"></i>
              </div>
              <div className="form-input-container">
                <h5 className="form-label">User Name</h5>
                <input
                  name="username"
                  value={user.username}
                  onChange={handleOnChange}
                  type="text"
                  className="form-input"
                />
                
              </div>
            </div>

            <div className="form-group">
              <div className="form-icon">
                <i className="fas fa-lock"></i>
              </div>
              <div className="form-input-container">
                <h5 className="form-label">Password</h5>
                <input
                  name="password"
                  value={user.password}
                  type="password"
                  className="form-input"
                  onChange={handleOnChange}
                />
                
              </div>
            </div>

            <button
              className="btn btn-login"
              type="button"
              onClick={handleLoginClick}
            >
              Đăng nhập
            </button>
            {/* <p href="#" className="btn-forget">
              <Link to="/forgot">Quên mật khẩu</Link>
            </p> */}
            <p className="pass-to-register">
              Tạo tài khoản mới? <Link to="/register">Đăng ký</Link>
            </p>
          </form>

          <div className="login-back">
            <Link to="/">
              <i className="fas fa-arrow-left"></i>
              <span>Quay về trang chủ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
