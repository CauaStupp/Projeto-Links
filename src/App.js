import React from "react";
import { createBrowserRouter } from 'react-router-dom';
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Error from "./pages/Error/Error";
import Security from "./routes/Security";
import Networks from "./pages/Networks/Networks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <Security> <Admin /> </Security>
  },
  {
    path: '/admin/social',
    element: <Security> <Networks /> </Security>
  },
  {
    path: "*",
    element: <Error />
  },
]);


export { router };