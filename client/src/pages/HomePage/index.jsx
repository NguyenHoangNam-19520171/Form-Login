import "./styles.scss"
import loginSuccessImg from '../../assets/img/Login/loginSuccess.jpg'
import pleaseLogin2 from '../../assets/img/Login/pleaseLogin2.png'
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { loginSuccess } from "../../redux/auth"

import { createAxios} from "../../util/createNewToken"
import { SERVER_URL } from "../../constants"
import axios from "axios"

const HomePage = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login?.currentUser);
    
    useEffect(()=>{
        createAxios(user, dispatch, loginSuccess)
    },[])
    return(
        <>
            {
                user?
                    <div className="home-container">
                        <h1>Hello {user?.username}!!!</h1>
                        <img src={loginSuccessImg} alt="login-success" />
                        <h2>Congratulation login success!!!</h2>
                    </div>
                :
                <>
                    <div className="home-container">
                        <h1>Please login to continue!!!</h1>
                        <img src={pleaseLogin2} alt="login-success" />
                    </div>
                </>
            }
        </>
    )
}

export default HomePage