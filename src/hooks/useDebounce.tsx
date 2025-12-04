// useDebounce.ts (Создайте этот файл)
import {useState, useEffect} from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Устанавливаем таймер
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Отменяем предыдущий таймер при каждом изменении 'value'
        // или при размонтировании компонента.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;