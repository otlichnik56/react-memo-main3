import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { EasyModeProvider } from "./contexts/EasyModeContext";
import { LeaderboardProvider } from "./contexts/LeaderboardContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EasyModeProvider> 
      <LeaderboardProvider>
      <RouterProvider router={router}></RouterProvider>
      </LeaderboardProvider>      
    </EasyModeProvider>
  </React.StrictMode>,
);
