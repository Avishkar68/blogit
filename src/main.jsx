import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Hero from "./components/Hero.jsx";
import Blog from "./components/Blog.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import MainPage from "./components/MainPage.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import UserProfile from "./components/Profile.jsx/UserProfile.jsx";
import CreateBlog from "./components/CreateBlog.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/createblog" element={<CreateBlog />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
