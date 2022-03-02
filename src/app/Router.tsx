import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Counter from "../features/counter/Counter";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/sign-up/SignUpPage";
import { useAppSelector } from "./hooks";

const Router: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => Boolean(state.auth.user));

  return (
    <BrowserRouter>
      <Routes>
        <>
          {isLoggedIn && <Route path="*" element={<Counter />} />}
          {!isLoggedIn && <Route path="/signup" element={<SignUpPage />} />}
          {!isLoggedIn && <Route path="*" element={<LoginPage />} />}
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
