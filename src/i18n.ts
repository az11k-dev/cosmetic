import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import headerOneUzbData from "./localesI18n/uzb/headerOneUzb.json";
import headerOneRuData from "./localesI18n/rus/headerOneRu.json";
import headerTwoUzbData from "./localesI18n/uzb/headerTwoUzb.json";
import headerTwoRuData from "./localesI18n/rus/headerTwoRu.json";
import headerManuUzbData from "./localesI18n/uzb/headerManuUzb.json";
import headerManuRuData from "./localesI18n/rus/headerManuRu.json";
import footerUzbData from "./localesI18n/uzb/footerUzb.json";
import footerRuData from "./localesI18n/rus/footerRu.json";
import heroUzbData from "./localesI18n/uzb/heroSliderUzb.json";
import heroRuData from "./localesI18n/rus/heroSliderRu.json";
import commonUzb from "./localesI18n/uzb/commonUzb.json";
import commonRu from "./localesI18n/rus/commonRu.json";
import categoryUzb from "./localesI18n/uzb/categoryNameUzb.json";
import categoryRu from "./localesI18n/rus/categoryNameRu.json";
import dealUzb from "./localesI18n/uzb/dealUz.json";
import dealRu from "./localesI18n/rus/dealRu.json";
import itemUzb from "./localesI18n/uzb/itemCardUzb.json";
import itemRu from "./localesI18n/rus/itemCardRu.json";
import itemNameUz from "./localesI18n/uzb/itemName.json";
import itemNameRu from "./localesI18n/rus/itemName.json";
import bannerUz from "./localesI18n/uzb/banner.json";
import bannerRu from "./localesI18n/rus/banner.json";
import arrialsUz from "./localesI18n/uzb/arrials.json";
import arrialsRu from "./localesI18n/rus/arrials.json";
import offerUz from "./localesI18n/uzb/offer.json";
import offerRu from "./localesI18n/rus/offer.json";
import servicesUz from "./localesI18n/uzb/services.json";
import servicesRu from "./localesI18n/rus/services.json";
import trackUz from "./localesI18n/uzb/track.json";
import trackRu from "./localesI18n/rus/track.json";
import sidebarUz from "./localesI18n/uzb/sidebar.json";
import sidebarRu from "./localesI18n/rus/sidebar.json";
import tredingRU from "./localesI18n/rus/tredingRu.json";
import tredingUzb from "./localesI18n/uzb/tredingUzb.json";
import tredingAllRU from "./localesI18n/rus/treadingAllRu.json";
import tredingAllUzb from "./localesI18n/uzb/treadingAllUzb.json";
import faqAllRU from "./localesI18n/rus/faqAllRU.json";
import faqAllUzb from "./localesI18n/uzb/faqAllUzb.json";
import cartAllRuData from "./localesI18n/rus/cartAllRu.json";
import cartAllUzbData from "./localesI18n/uzb/cartAllUzb.json";
import manuRuData from "./localesI18n/rus/manuMobile.json";
import manuUzbData from "./localesI18n/uzb/manuMobile.json"
import contactsUz from "./localesI18n/uzb/about.json"
import contactsRu from "./localesI18n/rus/contacts.json"
import aboutUz from "./localesI18n/uzb/aboutUz.json"
import aboutRu from "./localesI18n/rus/aboutRu.json"
import factUz from "./localesI18n/uzb/fact.json"
import factRu from "./localesI18n/rus/fact.json"
import wishlistUz from "./localesI18n/uzb/wishlist.json"
import wishlistRu from "./localesI18n/rus/wishlist.json"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            uz: {
                headerOne: headerOneUzbData,
                headerTwo: headerTwoUzbData,
                headerManu: headerManuUzbData,
                footer: footerUzbData,
                heroSlider: heroUzbData,
                common: commonUzb,
                categoryNames: categoryUzb,
                deal1: dealUzb,
                productCard: itemUzb,
                itemNames: itemNameUz,
                banner: bannerUz,
                newArrivals: arrialsUz,
                offerBanners: offerUz,
                services: servicesUz,
                trackOrder: trackUz,
                sidebarCart: sidebarUz,
                treding: tredingUzb,
                tredingAll: tredingAllUzb,
                faqAll: faqAllUzb,
                cartAll: cartAllUzbData,
                manuMobile: manuUzbData,
                contacts: contactsUz,
                about:aboutUz,
                facts:factUz,
                wishlist:wishlistUz
            },
            ru: {
                headerOne: headerOneRuData,
                headerTwo: headerTwoRuData,
                headerManu: headerManuRuData,
                footer: footerRuData,
                heroSlider: heroRuData,
                common: commonRu,
                categoryNames: categoryRu,
                deal1: dealRu,
                productCard: itemRu,
                itemNames: itemNameRu,
                banner: bannerRu,
                newArrivals: arrialsRu,
                offerBanners: offerRu,
                services: servicesRu,
                trackOrder: trackRu,
                sidebarCart: sidebarRu,
                treding: tredingRU,
                tredingAll: tredingAllRU,
                faqAll: faqAllRU,
                cartAll: cartAllRuData,
                manuMobile: manuRuData,
                contacts: contactsRu,
                about:aboutRu,
                facts:factRu,
                wishlist:wishlistRu
            },
        },

        fallbackLng: "uz",


        ns: ["headerOne", "headerTwo", "headerManu", "footer", "heroSlider", "common", "categoryNames", "deal1", "productCard", "itemNames", "banner", "newArrivals", "offerBanners", "services", "trackOrder", "sidebarCart", "treding", "tredingAll", "faqAll", "cartAll", "manuMobile", "contacts","about","facts","wishlist"],
        defaultNS: "headerOne",


        detection: {
            order: ['localStorage', 'cookie', 'htmlTag',],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false,
        },
        debug: false,
    });

export default i18n;