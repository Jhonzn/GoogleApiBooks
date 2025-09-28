
import axios from "axios";

const API_URL = "http://localhost:8081/auth/";

export const register = (nombre, email, password) => 
    axios.post(API_URL + "register", {nombre, email, password });

export const login = async (email, password) => {
    const {data} = await axios.post(API_URL + "login", { email, password });
    localStorage.setItem("token", data.token);
    return data;
}

export const logout = () => {
  localStorage.removeItem("token");
};
