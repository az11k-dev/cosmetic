import React, {JSX, Suspense, useEffect} from "react";
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import {
    mainRoutes,
    noLayoutRoutes,
} from "./routes";
import {RouteItem} from "./types/route.types";
import {Loader} from "./components/loader";
import {useDispatch} from "react-redux";
import {setSelectedCategory} from "./store/reducers/filterReducer";

// 💡 ИМПОРТИРУЕМ НОВЫЙ ХУК useAuth
import {useAuth} from "@/context/AuthContext";


const LoadingFallback = () => <Loader/>;

interface ProtectedRouteProps {
    element: JSX.Element;
    meta?: {
        requiresAuth?: boolean;
    };
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({element, meta}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    // 💡 ИСПОЛЬЗУЕМ useAuth ВМЕСТО ЛОГИКИ С localStorage
    const {isAuthenticated} = useAuth();
    // ----------------------------------------------------

    useEffect(() => {
        // Логика Redux для сброса категории (не связана с аутентификацией) остается
        dispatch(setSelectedCategory([]));
    }, [location.pathname, dispatch]);

    if (meta?.requiresAuth && !isAuthenticated) {
        // Если роут требует аутентификации, а пользователь не аутентифицирован (по Context)
        return <Navigate to="/login" replace/>;
    }

    return element;
};

const App: React.FC = () => {
    return (
        <BrowserRouter basename={process.env.VITE_APP_PATH || "/"}>
            <Suspense fallback={<LoadingFallback/>}>
                <Routes>
                    {/* Main Layout Routes */}
                    <Route element={<mainRoutes.layout/>}>
                        {mainRoutes.routes.map((route: RouteItem) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <ProtectedRoute element={route.element} meta={route.meta}/>
                                }
                            />
                        ))}
                    </Route>
                    {/* Routes without Layout */}
                    {noLayoutRoutes.map((route: RouteItem) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <ProtectedRoute element={route.element} meta={route.meta}/>
                            }
                        />
                    ))}
                </Routes>

                {/*<Routes>*/}
                {/*    /!* ... другие маршруты ... *!/*/}
                {/*    /!* 💡 Этот маршрут принимает параметр id *!/*/}
                {/*    <Route path="/product-details/:id" element={<ProductDetailsPage />} />*/}
                {/*    /!* ... *!/*/}
                {/*</Routes>*/}
            </Suspense>
        </BrowserRouter>
    );
};

export default App;