import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MainPage from "./pages/main/MainPage";
import PersonPage from "./pages/person/PersonPage";

import StyleRoot from "./style/StyleRoot";
export default function App(): JSX.Element {
  return (
    <StyleRoot>
      <BrowserRouter>
        <Header />
        <div style={{ marginTop: "80px" }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/@:id" element={<PersonPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </StyleRoot>
  );
}
