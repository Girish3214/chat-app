import { createContext, useCallback, useContext, useState } from "react";
import { postRequest } from "../uitils/serviceCalls";
import { loginApi, registerApi } from "../uitils/apiUrls";

const AppContext = createContext();

const initialData = {
  name: "",
  email: "",
  password: "",
};

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState(initialData);
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const [loading, setloading] = useState(false);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (body) => {
    setloading(true);
    setRegisterError(null);
    const response = await postRequest(registerApi, body);
    if (response.error) {
      return setRegisterError(response);
    }
    setloading(false);
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
  }, []);

  const loginUser = useCallback(async (body) => {
    setloading(true);
    setLoginError(null);
    const response = await postRequest(loginApi, body);
    if (response.error) {
      return setLoginError(response);
    }
    setloading(false);
    localStorage.setItem("user", JSON.stringify(response));
    setUser(response);
    return response;
  }, []);
  return (
    <AppContext.Provider
      value={{
        user,
        registerInfo,
        registerError,
        loginError,
        loading,
        updateRegisterInfo,
        registerUser,
        loginUser,
        setRegisterError,
        setLoginError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
