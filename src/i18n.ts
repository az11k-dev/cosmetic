import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 2-Qadamda yaratilgan fayllarni import qilish
import headerOneUzbData from "./localesI18n/uzb/headerOneUzb.json";
import headerOneRuData from "./localesI18n/rus/headerOneRu.json";
import headerTwoUzbData from "./localesI18n/uzb/headerTwoUzb.json";
import headerTwoRuData from "./localesI18n/rus/headerTwoRu.json";
import headerManuUzbData from "./localesI18n/uzb/headerManuUzb.json";
import headerManuRuData from "./localesI18n/rus/headerManuRu.json";
import footerUzbData from "./localesI18n/uzb/footerUzb.json";
import footerRuData from "./localesI18n/rus/footerRu.json";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // 💡 FAQAT UZB VA RUS TILLARI
        resources: {
            // Til kodi (uz) : { Namespace nomi: Fayl tarkibi }
            // 💡 TUZATILDI: Nom maydoni "headerOne" deb bir xil nomlanadi
            uz: {
                headerOne: headerOneUzbData,
                headerTwo:headerTwoUzbData,
                headerManu: headerManuUzbData,
                footer: footerUzbData,
            },
            ru: {
                headerOne: headerOneRuData,
                headerTwo: headerTwoRuData,
                headerManu: headerManuRuData,
                footer: footerRuData,
            },
        },

        // 💡 Agar til topilmasa yoki mavjud bo'lmasa, har doim "uz" ishlatiladi.
        fallbackLng: "uz",

        // Asosiy Namespace va default namespace ni belgilash
        ns: ["headerOne","headerTwo","headerManu","footer"],
        defaultNS: "headerOne", // Bu "headerOne" namespace ni ko'rsatadi

        // Avval saqlangan tilni ishlatish uchun detektor sozlamasi
        detection: {
            order: ['localStorage', 'cookie', 'htmlTag'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false,
        },
        debug: process.env.NODE_ENV === 'development',
    });

export default i18n;