import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AlbumPage from "./pages/AlbumPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";
import AlbumDetailsPage from "./pages/AlbumDetailsPage.jsx";
import PhotoPage from "./pages/PhotoPage.jsx";
import PrivateRoutes from "./routes/privateRoutes.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserDetailsPage />} />
        <Route path="/albums" element={<AlbumPage />} />
        <Route
          path="/users/:userId/albums/:albumId"
          element={<AlbumDetailsPage />}
        />
        <Route
          path="/users/:userId/albums/:albumId/photos/:photoId"
          element={<PhotoPage />}
        />
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
