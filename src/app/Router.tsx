import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/sign-up/SignUpPage";
import HomePage from "../pages/home/HomePage";
import { useAppSelector } from "./hooks";
import RegisterNfePage from "../pages/register-nfe/RegisterNfePage";

const Router: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => Boolean(state.auth.user));

  return (
    <BrowserRouter>
      <Routes>
        <>
          {isLoggedIn && <Route path="/" element={<HomePage />} />}
          {isLoggedIn && <Route path="/new" element={<RegisterNfePage />} />}
          {isLoggedIn && <Route path="*" element={<Navigate to="/" />} />}
          {!isLoggedIn && <Route path="/signup" element={<SignUpPage />} />}
          {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
