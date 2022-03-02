import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Counter from "../features/counter/Counter";
import LoginPage from "../pages/login/LoginPage";
import SignUpPage from "../pages/sign-up/SignUpPage";

const Router: React.FC = () => {
  const isLoggedIn = false; // TODO: remove mock

  return (
    <BrowserRouter>
      <Routes>
        <>
          {isLoggedIn && <Route path="*" element={<Counter />} />}
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
