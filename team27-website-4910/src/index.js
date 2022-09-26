import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from './pages/Home';
import Register from './pages/Register';
import LogIn from './pages/LogIn';

export const SessionContext = createContext();

const SessionContextProvider = (props) => {
  const [ sessionState, setSessionState ] = useState('0');

  return (
    <SessionContext.Provider value={{sessionState, setSessionState}}>
      {props.children}
    </SessionContext.Provider>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login/",
    element: <LogIn />,
  },
  {
    path: "register/",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </React.StrictMode>
);
