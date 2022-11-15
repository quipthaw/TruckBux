import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { RecoilRoot } from 'recoil';
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import Sponsors from './pages/Sponsors';
import Drivers from './pages/Drivers';
import SponsorCreation from "./pages/SponsorCreation";
import Logs from './pages/Logs';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/sponsors",
    element: <Sponsors />,
  },
  {
    path: "/drivers",
    element: <Drivers />,
  },
  {
    path: "/sponsorcreation",
    element: <SponsorCreation />,
  },
  {
    path: "/logs",
    element: <Logs />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
