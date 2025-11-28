import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode
} from 'react';
import { Item } from "@/types/data.types";

// 💡 LOCAL_STORAGE kaliti
const LOCAL_STORAGE_KEY = 'productWishlist';

// 💡 1. Context Turini aniqlash
interface WishlistContextType {
    wishlistItems: Item[];
    // Istaklar ro'yxatiga mahsulot qo'shish
    addWishlistItem: (item: Item) => void;
    // Istaklar ro'yxatidan mahsulotni o'chirish
    removeWishlistItem: (id: string | number) => void;
}

// Boshlang'ich holatni localStorage'dan yuklash funksiyasi
const initializeWishlist = (): Item[] => {
    // SSR xatolarini oldini olish
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const storedWishlist = localStorage.getItem(LOCAL_STORAGE_KEY);
        // Ma'lumotni JSON'dan massivga aylantirib qaytaramiz
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
        console.error("localStorage'dan wishlist ma'lumot yuklashda xatolik:", error);
        return [];
    }
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// 💡 2. Custom Hook yaratish (komponentlarda ishlatish uchun)
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist hookini WishlistProvider ichida ishlatish kerak');
    }
    return context;
};

// 💡 3. Context Provider komponenti
interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    // Boshlang'ich holatni localStorage'dan yuklaymiz
    const [wishlistItems, setWishlistItems] = useState<Item[]>(initializeWishlist);

    // 💡 useEffect: wishlistItems o'zgarganda uni localStorage'ga saqlaymiz
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(wishlistItems));
                console.log("Wishlist localStorage'ga saqlandi.");
            } catch (error) {
                console.error("localStorage'ga wishlist saqlashda xatolik:", error);
            }
        }
    }, [wishlistItems]); // wishlistItems o'zgarganda ishga tushadi

    // 💡 Mahsulotni istaklar ro'yxatiga qo'shish
    const addWishlistItem = useCallback((item: Item) => {
        setWishlistItems(prevItems => {
            // Agar mahsulot allaqachon ro'yxatda bo'lmasa, qo'shamiz
            if (!prevItems.some(i => i.id === item.id)) {
                return [...prevItems, item];
            }
            return prevItems;
        });
    }, []);

    // 💡 Mahsulotni istaklar ro'yxatidan o'chirish
    const removeWishlistItem = useCallback((id: string | number) => {
        setWishlistItems(prevItems => prevItems.filter(i => i.id !== id));
    }, []);

    // Context qiymati
    const contextValue: WishlistContextType = {
        wishlistItems,
        addWishlistItem,
        removeWishlistItem,
    };

    return (
        <WishlistContext.Provider value={contextValue}>
            {children}
        </WishlistContext.Provider>
    );
};