import React from "react";
import NavbarHeader from "./Components/NavbarHeader";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreatePostPage from "./Pages/CreatePostPage";
import SinglePostPage from "./Pages/SinglePostPage";
import PrivateRoute from "./Components/ProtectedRoute";
import AddNewPost from "./Pages/AddNewPost";
import EditPost from "./Pages/EditPost";

function App() {
  return (
    <> {/*react fragment, used to group multiple elements without adding extra nodes to the DOM */}
      <NavbarHeader />  
      <Routes>  {/* ye container hai saare routes ke liye react router batata hai ki insme se kaunsa route match hoga */}
        <Route path="/" element={<Homepage />} />  {/* path URL */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>  {/* ye custome route hai jo authentication ko check karta hai */}
          <Route path="/create" element={<CreatePostPage />} />
        </Route>
        <Route path="/post/:id" element={<SinglePostPage />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
        <Route path="/add-post" element={<AddNewPost />} />
      </Routes>
    </>
  );
}

export default App;
