import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 💡 Til holati uchun interfeys
interface I18nState {
    currentLanguage: string;
}

// Boshlang'ich holat
const initialState: I18nState = {
    currentLanguage: 'uz',
};

// I18n Redux Slice yaratish
const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        // Tilni o'zgartiradigan action
        setLanguage: (state, action: PayloadAction<string>) => {
            state.currentLanguage = action.payload;
        },
    },
});

// Action'larni export qilish
export const { setLanguage } = i18nSlice.actions;
const i18nReducer = i18nSlice.reducer;

// Redux Persist konfiguratsiyasi
const persistConfig = {
    key: 'i18n', // LocalStorage da saqlanadigan kalit nomi
    storage,
};

// Persisted Reducer'ni yaratish va export qilish
export const persistedI18nReducer = persistReducer(persistConfig, i18nReducer);