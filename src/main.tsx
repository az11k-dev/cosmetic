import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Providers from "@/store/Provider";
import "./index.css";
import "./i18n.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
);
