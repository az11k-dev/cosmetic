import { Deal } from "@/types/data.types";


const deal: Deal[] = [

    {
        name: "prodTitle_1",
        sale: "Sale",
        images:  [
            {
                is_main: 1,
                file_url: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg"
            },
            {
                is_main: 0,
                file_url: "https://cdn.pixabay.com/photo/2018/08/04/11/30/draw-3583548_1280.png"
            }
        ],
        category: "catPerfumes",
        old_price: 2.0,
        price: 3.0,
        location: "Online",
        brand: "Glamour Glow",
        sku: 23122,
        id: 1,
        quantity: 1,
        weight: "100g",
        rating: 4,
        status: "Out Of Stock",
    },
];

export default deal;