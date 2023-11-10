import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/home";
import About from "./pages/about";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import DailyCard from "./pages/DailyCard";
import Goals from "./pages/Goals";
import Goal from "./pages/Goal";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/daily-card" element={<DailyCard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/goal" element={<Goal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
