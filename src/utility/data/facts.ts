// Предположительно, файл с данными facts
import {Facts} from "@/types/data.types";

const facts: Facts[] = [
    {
        counter: "65K+",
        // Ключи перевода вместо текста
        discription: "facts_description_1",
        name: "facts_name_1", // 'Vendors'
        item: 320,
    },
    {
        counter: "$45B+",
        discription: "facts_description_2",
        name: "facts_name_2", // 'Earnings'
        item: 65,
    },
    {
        counter: "25M+",
        discription: "facts_description_3",
        name: "facts_name_3", // 'Sold'
        item: 548,
    },
    {
        counter: "70K+",
        discription: "facts_description_4",
        name: "facts_name_4", // 'Products'
        item: 48,
    },
];
export default facts;