import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import Providers from "@/store/Provider";
import "./index.css";
import "./i18n.ts";
import {AuthProvider} from "@/context/AuthContext.tsx";
import {FilterProvider} from "@/context/FilterContext.tsx";
// 💡 CartProviderni import qilamiz
import {CartProvider} from "@/context/CartContext.tsx";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <FilterProvider>
                <CartProvider>
                    <Providers>
                        <App/>
                    </Providers>
                </CartProvider>
            </FilterProvider>
        </AuthProvider>
    </StrictMode>
);