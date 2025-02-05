import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../src/Home"; // ✅ Проверяем, что путь правильный
import Profile from "../src/Profile"; // ✅ Проверяем путь

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}
