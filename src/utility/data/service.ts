import { Service } from "@/types/data.types";


const service: Service[] = [
    {
        icon: "fi fi-ts-truck-moving",
        // Matn o'rniga JSON fayldagi kalitni beramiz
        nameKey: "service.free_shipping_name",
        titleKey: "service.free_shipping_title",
    },
    {
        icon: "fi fi-ts-hand-holding-seeding",
        nameKey: "service.support_name",
        titleKey: "service.support_title",
    },
    {
        icon: "fi fi-ts-badge-percent",
        nameKey: "service.return_name",
        titleKey: "service.return_title",
    },
    {
        icon: "fi fi-ts-donate",
        nameKey: "service.payment_name",
        titleKey: "service.payment_title",
    },
];
export default service