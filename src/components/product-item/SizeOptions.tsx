import React, { useEffect, useMemo, useState } from 'react'

interface SizeOptionsProps {
    categories: string[];
    subCategory: string;
}

interface SizeOption {
    value: string;
    tooltip: string;
}

const SizeOptions: React.FC<SizeOptionsProps> = ({ categories, subCategory }) => {
    const [options, setOptions] = useState<SizeOption[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const Categories: Record<string, Record<string, SizeOption[]>> = useMemo(() => ({
        vegetables: {
            "Vegetables": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ],
            "Tuber root": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ],
            "Potato": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ],
            "Eggs": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ],
            "Dried Fruits": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ],
            "Fresh Fruit": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ], "Foods": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ], "Snacks": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ], "chips & fries": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ], "Mix Snack": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ],
            "Cookies": [
                { value: '30ml', tooltip: 'Small' },
                { value: '50ml', tooltip: 'Medium' },
                { value: '75ml', tooltip: 'Large' },
                { value: '100ml', tooltip: 'Extra Large' }
            ],

        },

    }), [])

    useEffect(() => {
        const allOptions: SizeOption[] = [];
        categories.forEach((category: string) => {
            const subCategoryOptions = Categories[category]?.[subCategory];
            if (subCategoryOptions) {
                allOptions.push(...subCategoryOptions);
            }
        });

        setOptions(allOptions);
    }, [categories, subCategory, Categories]);

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };
    return (
        <>
            <ul className="gi-opt-size">
                {options.map((data: any, index) => (
                    <li key={index} onClick={() => handleClick(index)} className={activeIndex === index ? "active" : ""}>
                        <a className="gi-opt-sz" data-tooltip={data.tooltip}>
                            {data.value}
                        </a>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default SizeOptions
