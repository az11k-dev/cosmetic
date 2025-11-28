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
import { WishlistProvider } from '@/context/WishlistContext';

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <FilterProvider>
                <WishlistProvider>
                    <CartProvider>
                        <Providers>
                            <App/>
                        </Providers>
                    </CartProvider>
                </WishlistProvider>
            </FilterProvider>
        </AuthProvider>
    </StrictMode>
);