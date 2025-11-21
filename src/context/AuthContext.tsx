// src/context/AuthContext.tsx

import React, {
    createContext,
    useReducer,
    useEffect,
    useContext,
    ReactNode,
} from "react";

// Интерфейс для данных пользователя в camelCase (как в вашем Redux коде)
export interface UserState {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

// Интерфейс для состояния аутентификации
interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: UserState | null;
}

// Начальное состояние
const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

// Интерфейс для экшенов (действий)
type AuthAction =
    | { type: "LOGIN"; payload: AuthState } // Payload содержит token и user
    | { type: "LOGOUT" }
    | { type: "SET_INITIAL_STATE"; payload: AuthState }; // Для загрузки из localStorage

// Редьюсер для обработки экшенов
const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            // Сохранение в localStorage происходит в провайдере
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
            };
        case "LOGOUT":
            // Удаление из localStorage происходит в провайдере
            return {
                ...initialState,
            };
        case "SET_INITIAL_STATE":
            // Установка состояния из localStorage при инициализации
            return action.payload;
        default:
            return state;
    }
};

// Интерфейс для Context Value (что будет доступно через useAuth)
interface AuthContextType extends AuthState {
    login: (token: string, apiUser: any) => void;
    logout: () => void;
}

// Создание контекста с дефолтными значениями
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Хук для удобного использования контекста в компонентах
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

// Провайдер, который управляет состоянием и localStorage
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
                                                                    children,
                                                                }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // 💡 Эффект для имитации Redux-Persist (загрузка состояния при старте)
    useEffect(() => {
        try {
            const persistedToken = localStorage.getItem("authToken");
            const persistedUser = localStorage.getItem("authUserData");

            if (persistedToken && persistedUser) {
                const user = JSON.parse(persistedUser);
                dispatch({
                    type: "SET_INITIAL_STATE",
                    payload: {
                        isAuthenticated: true,
                        token: persistedToken,
                        user: user,
                    },
                });
            }
        } catch (error) {
            console.error("Error loading persisted state:", error);
        }
    }, []);

    // 💡 Эффект для имитации Redux-Persist (сохранение состояния при изменении)
    // Сохраняем user и token отдельно, как вы делали в Redux slice
    useEffect(() => {
        if (state.token && state.user) {
            localStorage.setItem("authToken", state.token);
            localStorage.setItem("authUserData", JSON.stringify(state.user));
        } else {
            // Очистка при LOGOUT
            localStorage.removeItem("authToken");
            localStorage.removeItem("authUserData");
        }
    }, [state.token, state.user]);


    // 📢 РУЧНАЯ ФУНКЦИЯ LOGIN (заменяет Redux Action/Reducer) 📢
    const handleLogin = (token: string, apiUser: any) => {
        // Преобразование snake_case полей из API в camelCase для стейта
        const userPayload: UserState = {
            id: apiUser.id,
            username: apiUser.username,
            first_name: apiUser.first_name, // Ключевой момент: first_name -> first_name
            last_name: apiUser.last_name,
            email: apiUser.email,
            phone_number: apiUser.phone_number,
        };

        const loginState: AuthState = {
            isAuthenticated: true,
            token: token,
            user: userPayload,
        };

        // Диспатч экшена в контекст-редьюсер
        dispatch({type: "LOGIN", payload: loginState});
    };

    // РУЧНАЯ ФУНКЦИЯ LOGOUT (заменяет Redux Action/Reducer)
    const handleLogout = () => {
        dispatch({type: "LOGOUT"});
        // localStorage очищается в useEffect
    };

    // Значения, которые будут доступны для всех потребителей контекста
    const contextValue: AuthContextType = {
        ...state,
        login: handleLogin,
        logout: handleLogout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};