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
import Catalog from './pages/Catalog';
import { ManageAccount } from "./components/ManageAccount/ManageAccounts";
import AccountManagement from "./pages/AccountManagement";
import Sponsors from './pages/Sponsors';
import Drivers from './pages/Drivers';

export const SessionContext = createContext();

const SessionContextProvider = (props) => {
  //SessionStates: 
  //0: not signed in
  //D: driver signed in
  //S: sponsor signed in
  //A: admin signed in
  const [sessionState, setSessionState] = useState('0');
  //General profile states
  const [usernameState, setUsernameState] = useState("");
  const [firstnameState, setFirstnameState] = useState("");
  const [lastnameState, setLastnameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [bioState, setBioState] = useState("");
  const [sponsorIDs, setSponsorIDs] = useState();

  // not used, but may need in future to maintain authentic calls to db
  //const [ tokenState, setTokenState ] = useState(""); 

  return (
    <SessionContext.Provider
      value={{
        sessionState, setSessionState,
        usernameState, setUsernameState,
        firstnameState, setFirstnameState,
        lastnameState, setLastnameState,
        emailState, setEmailState,
        bioState, setBioState,
        sponsorIDs, setSponsorIDs
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
  {
    path: "catalog/",
    element: <Catalog />,
  },
  {
    path: "AccountManagement/",
    element: <AccountManagement />,
  },
  {
    path: "sponsors/",
    element: <Sponsors />,
  },
  {
    path: "drivers/",
    element: <Drivers />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider>
      <RouterProvider router={router} />
    </SessionContextProvider>
  </React.StrictMode>
);
