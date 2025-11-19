import {createSlice} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Интерфейс для данных пользователя, ожидаемых в стейте (camelCase)
interface UserState {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    // Можно добавить created_at/updated_at, если нужно
}

// Интерфейс для начального состояния
interface RegistrationState {
    isAuthenticated: boolean;
    token: string | null;
    user: UserState | null;
}

const initialState: RegistrationState = {
    isAuthenticated: false,
    token: null,
    user: null,
};

const registrationSlice = createSlice({
    name: "registration",
    initialState,
    reducers: {
        // 📢 ОБНОВЛЕННАЯ ФУНКЦИЯ login 📢
        login: (state, action) => {
            // action.payload ожидает объект, который мы отправляли из компонента:
            // { token: "...", id: 3, first_name: "Azizbek", ... }
            const apiUser = action.payload;

            // Преобразование snake_case полей из API в camelCase для Redux стейта
            const userPayload: UserState = {
                id: apiUser.id,
                username: apiUser.username,
                // ЭТО КЛЮЧЕВОЙ МОМЕНТ: Преобразование first_name -> firstName
                firstName: apiUser.first_name,
                lastName: apiUser.last_name,
                email: apiUser.email,
                phoneNumber: apiUser.phone_number,
                // ...
            };

            state.isAuthenticated = true;
            state.token = apiUser.token; // Сохраняем токен отдельно
            state.user = userPayload;// Сохраняем преобразованные данные пользователя
        },
        // ------------------------------------

        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null; // Очищаем токен при выходе
            state.user = null;
        },

        // Обновил setUserData, чтобы он был более явным
        setUserData: (state, action) => {
            // Этот reducer теперь используется для обновления данных пользователя, если нужно
            state.user = {...state.user, ...action.payload.user};
            if (action.payload.isAuthenticated !== undefined) {
                state.isAuthenticated = action.payload.isAuthenticated;
            }
        },
    },
});

export const {logout, login, setUserData} = registrationSlice.actions;

export const persistConfigRegistration = {
    key: "registration",
    storage,
    // ЯВНО УКАЗЫВАЕМ ПОЛЯ, КОТОРЫЕ ДОЛЖНЫ СОХРАНЯТЬСЯ
    whitelist: ['isAuthenticated', 'token', 'user'],
};

export const persistedRegistrationReducer = persistReducer(persistConfigRegistration, registrationSlice.reducer);

export default registrationSlice.reducer;