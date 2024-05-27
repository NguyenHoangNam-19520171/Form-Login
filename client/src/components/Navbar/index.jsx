import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/requestApi";
import { createAxios } from "../../util/createNewToken";
import { logOutSuccess } from "../../redux/auth";


const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const accessToken = user?.accessToken;
  const id = user?.id;
  let axiosJWT = createAxios(user,dispatch,logOutSuccess);
  const handleLogout = () =>{
    logOut(dispatch,id,navigate, accessToken,axiosJWT);
  }
  return (
    <nav className="navbar-container">
      <NavLink to="/" className="navbar-link"> Home </NavLink>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user?.username}  </span> </p>
        <NavLink to="/logout" className="navbar-link" onClick={handleLogout}> Log out</NavLink>
        </>
      ) : (    
        <>
      <NavLink to="/login" className="navbar-link"> Login </NavLink>
      <NavLink to="/register" className="navbar-link"> Register</NavLink>
      </>
)}
    </nav>
  );
};

export default NavBar;