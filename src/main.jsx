import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./router";
import GameContextProvider from "./store/GameContextProvider";
import StepperContextProvider from "./store/StepperContextProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StepperContextProvider>
      <GameContextProvider>
        <RouterProvider router={router} />
      </GameContextProvider>
    </StepperContextProvider>
  </StrictMode>
);
