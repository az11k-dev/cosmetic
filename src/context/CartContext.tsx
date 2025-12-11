import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode
} from 'react';
// Item tipini import qilish juda muhim
import {Item} from "@/types/data.types";

// 💡 LOCAL_STORAGE kaliti
const LOCAL_STORAGE_KEY = 'shoppingCart';

// 💡 1. Kengaytirilgan CartItem turi
interface CartItem extends Item {
    quantity: number;
    // Agar narx hisobini soddalashtirmoqchi bo'lsak, original newPrice'ni saqlaymiz
    // unitPrice: number; // Bu savatda yangilanishi kerak emas
}

// 💡 2. Context Turini aniqlash
interface CartContextType {
    cartItems: CartItem[];
    // Yangi element qo'shish yoki mavjudining miqdorini oshirish
    addItemToCart: (item: Item, quantity: number) => void;
    // Mahsulot miqdorini to'g'ridan-to'g'ri yangi qiymatga o'rnatish (oshirish/kamaytirish uchun)
    updateItemQuantity: (id: string, newQuantity: number) => void;
    // Mahsulotni savatdan butunlay o'chirish
    removeItemFromCart: (id: string) => void;
}

// Boshlang'ich holatni localStorage'dan yuklash funksiyasi
const initializeCart = (): CartItem[] => {
    // Server-Side Rendering (SSR) xatolarini oldini olish uchun tekshiruv
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
        // Agar ma'lumot bo'lsa, JSON'dan massivga aylantirib qaytaramiz
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("localStorage'dan ma'lumot yuklashda xatolik:", error);
        return [];
    }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom Hook yaratish
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart hookini CartProvider ichida ishlatish kerak');
    }
    return context;
};

// Context Provider komponenti
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    // 💡 Boshlang'ich holatni localStorage'dan yuklaymiz
    const [cartItems, setCartItems] = useState<CartItem[]>(initializeCart);

    // 💡 useEffect: cartItems o'zgarganda uni localStorage'ga saqlaymiz
    useEffect(() => {
        // Faqat mijoz tomonida saqlaymiz
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
            } catch (error) {
                console.error("localStorage'ga saqlashda xatolik:", error);
            }
        }
    }, [cartItems]);

    // Savatga qo'shish (Reduxdagi addItem/updateItemQuantity logikasini o'z ichiga oladi)
    const addItemToCart = useCallback((item: Item, quantity: number) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(i => i.id === item.id);

            if (existingItemIndex > -1) {
                // Mahsulot mavjud: Faqat miqdorni oshiramiz
                const updatedItems = [...prevItems];
                const existingItem = updatedItems[existingItemIndex];

                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: existingItem.quantity + quantity,
                    // Narxni o'zgartirmaymiz, chunki `newPrice` allaqachon `Item` ichida bor.
                    // Umumiy narxni komponent ichida hisoblaymiz.
                };
                return updatedItems;
            } else {
                // Yangi mahsulot: Savatga qo'shish
                return [...prevItems, {
                    ...item,
                    quantity: quantity,
                    // item.price'ni o'zgartirmaymiz, uni birlik narxi deb hisoblaymiz.
                } as CartItem];
            }
        });
    }, []);

    // 💡 Mahsulot miqdorini yangi qiymatga o'rnatish
    const updateItemQuantity = useCallback((id: string, newQuantity: number) => {
        setCartItems(prevItems => {
            if (newQuantity <= 0) {
                // Agar yangi miqdor 0 yoki undan kam bo'lsa, uni o'chiramiz
                return prevItems.filter(i => i.id !== id);
            }

            return prevItems.map(i => {
                if (i.id === id) {
                    return {
                        ...i,
                        quantity: newQuantity,
                    };
                }
                return i;
            });
        });
    }, []);

    // 💡 Mahsulotni savatdan butunlay o'chirish
    const removeItemFromCart = useCallback((id: string) => {
        setCartItems(prevItems => prevItems.filter(i => i.id !== id));
    }, []);

    const clearCart = useCallback((id: string) => {
        setCartItems([]);
    }, []);

    // Context qiymati
    const contextValue: CartContextType = {
        cartItems,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};