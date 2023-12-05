import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import store from "./store.js";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import EditProfileScreen from "./screens/EditProfileScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MovieScreen from "./screens/MovieScreen.jsx";
import UserProfileScreen from "./screens/UserProfileScreen.jsx";
import OtherUserProfileScreen from "./screens/OtherUserProfileScreen.jsx";
import FindMovieScreen from "./screens/FindMovieScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/movie/:_id" element={<MovieScreen />} />
      <Route path="/findMovie/:search" element={<FindMovieScreen />} />
      <Route path="/profile" element={<UserProfileScreen />} />
      <Route path="/profile/:username" element={<OtherUserProfileScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profileSettings" element={<EditProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
