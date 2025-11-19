import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import Providers from "@/store/Provider";
import "./index.css";
import "./i18n.ts";
import {AuthProvider} from "@/context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <Providers>
                <App/>
            </Providers>
        </AuthProvider>
    </StrictMode>
);
