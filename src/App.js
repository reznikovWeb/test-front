import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import FormPage from "./pages/FormPage/FormPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/details" element={<FormPage />} />
    </Routes>
  );
}

export default App;
