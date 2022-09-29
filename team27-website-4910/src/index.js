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
import Profile from './pages/Profile';

export const SessionContext = createContext();

const SessionContextProvider = (props) => {
  const [ sessionState, setSessionState ] = useState('0');
  const [ usernameState, setUsernameState ] = useState("");
  const [ firstNameState, setFirstNameState ] = useState("");
  
  // not used, but may need in future to maintain authentic calls to db
  const [ tokenState, setTokenState ] = useState(""); 
 
  return (
    <SessionContext.Provider 
      value={{
        sessionState, 
        setSessionState, 
        usernameState, 
        setUsernameState
      }}
    >
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
  {
    path: "profile/",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </React.StrictMode>
);
