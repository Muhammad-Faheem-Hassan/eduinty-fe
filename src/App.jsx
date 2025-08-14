import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UserForm from "./pages/User/Form";
import UserList from "./pages/User/List";
import CampusForm from "./pages/Campus/Form";
import CampusList from "./pages/Campus/lIST.JSX";
import LoginForm from "./pages/Auth/login";
import SignUpForm from "./pages/Auth/signUp";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users/form" element={<UserForm />} />
            <Route path="users/list" element={<UserList />} />
            <Route path="campus/form" element={<CampusForm />} />
            <Route path="campus/list" element={<CampusList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
