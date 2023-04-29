import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Girish",
  });
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
