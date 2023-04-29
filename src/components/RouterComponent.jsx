import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import ErrorPage from "../pages/error/ErrorPage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import SetAvatar from "../pages/avatar/SetAvatar";

const RouterComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default RouterComponent;
