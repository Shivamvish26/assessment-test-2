import React from "react";
import NavbarHeader from "./Components/NavbarHeader";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreatePostPage from "./Pages/CreatePostPage";
import SinglePostPage from "./Pages/SinglePostPage";
import PrivateRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <NavbarHeader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create" element={<CreatePostPage />} />
        </Route>
        <Route path="/post/:id" element={<SinglePostPage />} />
      </Routes>
    </>
  );
}

export default App;
