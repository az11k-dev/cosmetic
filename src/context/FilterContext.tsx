import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from 'react';

// 💡 1. TypeScript interfeyslari
interface FilterState {
    selectedCategory: string[];
    selectedWeight: string[];
    selectedColor: string[];
    selectedTags: string[];
    minPrice: number;
    maxPrice: number;
}

interface FilterContextType extends FilterState {
    handlePriceChange: (min: number, max: number) => void;
    handleCategoryChange: (category: string) => void;
    handleWeightChange: (weight: string) => void;
    handleColorChange: (color: string) => void;
    handleTagsChange: (tag: string) => void;
}

// 💡 2. Context yaratish
// 'null!' assertiv operatori bilan boshlang'ich qiymatni belgilaymiz, chunki Provider orqali qiymat berilishi kafolatlanadi.
const FilterContext = createContext<FilterContextType | null>(null);

// 💡 3. Custom Hook yaratish (kontekstdan foydalanish uchun)
export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
        // Xato tekshiruvi: Agar hook FilterProvider tashqarisida ishlatilsa
        throw new Error('useFilter hookini FilterProvider ichida ishlatish kerak');
    }
    return context;
};

// 💡 4. Context Provider komponenti
interface FilterProviderProps {
    children: ReactNode;
}

const initialFilterState: FilterState = {
    selectedCategory: [],
    selectedWeight: [],
    selectedColor: [],
    selectedTags: [],
    minPrice: 0, // Boshlang'ich min narx
    maxPrice: 1000, // Boshlang'ich max narx (Reduxdan olingan bo'lishi kerak, hozircha taxminiy)
};

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [state, setState] = useState<FilterState>(initialFilterState);

    // Barcha dispatch funksiyalarini useCallback orqali yaratamiz
    const handlePriceChange = useCallback((min: number, max: number) => {
        setState((prevState) => ({ ...prevState, minPrice: min, maxPrice: max }));
    }, []);

    const handleToggle = useCallback((key: keyof FilterState, value: string) => {
        setState((prevState) => {
            const currentArray = prevState[key] as string[];
            const updatedArray = currentArray.includes(value)
                ? currentArray.filter((item) => item !== value)
                : [...currentArray, value];

            return { ...prevState, [key]: updatedArray };
        });
    }, []);

    // Asosiy funksiyalarni bitta yordamchi funksiyaga o'tkazish
    const handleCategoryChange = useCallback((category: string) => handleToggle('selectedCategory', category), [handleToggle]);
    const handleWeightChange = useCallback((weight: string) => handleToggle('selectedWeight', weight), [handleToggle]);
    const handleColorChange = useCallback((color: string) => handleToggle('selectedColor', color), [handleToggle]);
    const handleTagsChange = useCallback((tag: string) => handleToggle('selectedTags', tag), [handleToggle]);

    // Context qiymati
    const contextValue: FilterContextType = {
        ...state, // Barcha holat (selectedCategory, minPrice, ...)
        handlePriceChange,
        handleCategoryChange,
        handleWeightChange,
        handleColorChange,
        handleTagsChange,
    };

    return (
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    );
};