import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { SERVER_URL } from "../constants";

export const refreshToken = async () => {
  try {
    const res = await axios.post(`${SERVER_URL}/v1/auth/refresh`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.newAccessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = data.newAccessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject("error: ",err);
    }
  );
  return newInstance;
};