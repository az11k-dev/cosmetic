import { RootState } from "@/store";
import {array} from "yup";

export interface moreItem {
    rating: number;
    image: string;
    title: string;
    oldPrice: number;
    newPrice: number;
    category?: string;
    weight?: string;
    color?: string;
    tags?: string;
}


export interface Facts {
    name: string;
    counter: string;
    discription: string;
    item: number;
  }

 export interface Team {
    name: string;
    image: string;
    title: string;
  }
  export interface Testimonials {
    name: string;
    image: string;
    subimage: string;
    category: string;
    description: string;
    subimagetwo: string;
  }

   export interface FashionBanner {
    name: string;
    image: string;
    num : number
  }

  export interface Blog {
    name: string;
    image: string;
    date: string;
    title: string;
    month?: string;

  }

  export interface BlogContent {
    category: string;
    image: string;
    date: string;
    title: string;
    description: string;
  }
  
  export interface Deal {
    category: string;
    sale: string;
    images: [];
    imageTwo: string;
    old_price: number;
    price: number;
    name: string;
    weight?: string;
    rating: any;
    status: string;
    location: string;
    brand: string;
    sku: number;
    quantity: number;
    id: number;
    is_main:number;
    file_url:string
  }

export interface ProductSidebar {
    category1: string;
    sale1: string;
    image1: string;
    imageTwo1: string;
    oldPrice1: number;
    newPrice1: number;
    title1: string;
    weight1?: string;
    rating1: any;
    status1: string;
    location1: string;
    brand1: string;
    sku1: number;
    quantity1: number;
    id: number;
}

  export interface Category {
    name: string;
    percentage: string;
    icon?: string;
    image: string;
    item: number;
    num?: number;
  }

  export interface ProductCategory {
    category: string;
    sale: string;
    image: string;
    imageTwo: string;
    oldPrice: number;
    newPrice: number;
    title: string;
    rating: any;
    status: string;
    location: string;
    brand: string;
    sku: number;
    quantity: number;
    color1 : any;
    color2 : any;
    color3 : any;
    size1: string;
    size2: string;
    id: number;
  }

   export interface Questions {
    questions: string;
    ans: string;
  }

   export interface FashionDeal {
    category: string;
    sale: string;
    image: string;
    imageTwo: string;
    oldPrice: number;
    newPrice: number;
    title: string;
    waight: string;
    rating: any;
    Status: string;
    location: string;
    brand: string;
    sku: number;
    quantity: number;
    color1: number;
    color2: number;
    color3: number;
    size1: string;
    size2: string;
    id: number
  }

  export interface Fashion {
    name: string;
    image: string;
    title: string;
    oldPrice: number;
    newPrice: number;
    quantity: number;
    id: number;
  }

  export interface Policy {
    questions: string;
  }

  export interface ProductImage {
    image: string;
  }

  export interface Product {
    id: string;
    title: string;
    image: string;
    newPrice: number;
  }

  export interface ProductItem {
    category: string;
    sale: string;
    image: string;
    imageTwo: string;
    oldPrice: number;
    newPrice: number;
    href?: string;
    title: string;
    waight?: string;
    rating: any;
    status: string;
    location: string;
    brand: string;
    sku: number;
    quantity: number;
    id : number;
    tags?: string;
  }

  export interface Service {
    name: string;
    icon: string;
    title: string;
  }

  export interface Selling {
    name: string;
    image: string;
    title: string;
    oldPrice: number;
    newPrice: number;
    waight: string
    quantity: number;
    id: number;
  }

  export interface Rated {
    name: string;
    image: string;
    title: string;
    oldPrice: number;
    newPrice: number;
    waight: string
    quantity: number;
    id: number;
  }

  export interface Trending {
    name: string;
    image: string;
    title: string;
    oldPrice: number;
    newPrice: number;
    waight: string
    quantity: number;
    id: number;
  }

  export interface VendorList {
    id: number;
    name: string;
    description: string;
    image: string;
    level: number;
    levelOutOf: number;
    products: number;
    month_since: number;
    year_since: number;
  }

  export interface VendorListTwo {
    id: number;
    name: string;
    description: string;
    image: string;
    level: number;
    levelOutOf: number;
    products: number;
  }

  export interface Term {
    questions: string;
  }

  export interface WrapperAnimationFCProps {
    children: React.ReactNode | React.ReactNode[];
    triggerOnce: boolean;
    className: string;
    index?: any;
    postData?: any;
  }
  
  export type ProductType = {
    id: number;
    name: string;
    thumb: string;
    price: string;
    count: number;
    color: string;
    size: string;
  };
  
  export type ProductStoreType = {
    id: number;
    name: string;
    thumb: string;
    price: number;
    count: number;
    color: string;
    size: string;
  };
  
  export enum TemplateEnum {
    THEME = "theme",
    TEMPLATE = "template",
  }
  
  export type ProductContentType<> = {
    url?: string;
    statekey: keyof RootState;
    postData?: any;
    WrapperAnimation?: React.FunctionComponent<WrapperAnimationFCProps>;
    // index?: any;
    wrapperClass?: any;
    containerTagName?: any;
    hasPaginate?: boolean;
    sortBy?: any;
    onSuccess?: (data: any) => void;
    onError?: (data: any) => void;
    view?: any;
    itemColClass?: any;
  };
  
  export interface Order {
    orderId: string;
    date: string;
    shippingMethod: string;
    totalItems: number;
    totalPrice: number;
    status: string;
    products: Product[];
  }

  export interface RecentBlog {
    category: string;
    image: string;
    date: string;
    title: string;
    description: string
  }

  export interface Shop {
    category: string;
    icon: string;
  }
  export interface Item {
    id: number;
    name?: string;
    category?: string;
    newPrice: number;
    waight?: string;
    sale?: string;
    images: unknown;
    image: string;
    imageTwo?: string;
    date?: string;
    old_price: number;
    href?: string;
    weight?: string;
    rating?: any;
    status?: string;
    location?: string;
    brand?: string;
    sku?: number;
    quantity: number;
    color?: string;
    tags?: string;
    wishlist?: string;
    color1?: string;
    color2?: string;
    color3?: string;
    size1?: string;
    size2?: string;
    price?: number;

  }

  export interface Weight {
    color: string;
  }

  export interface Shoptags{
    tags: string,
    count: number,
  }

  export interface GroupCategory {
    category: string,
    count: number,
  }

  export interface GroupTags {
    tags: string,
    count: number,
  }

  export interface GroupBrand  {
    brand: string,
    count: number,
  }

  export interface GroupColor  {
    color: string,
    count: number,
  }

  export interface GroupWeight {
    weight: string,
    count: number,
  }

  export interface Option {
    value: string;
    tooltip: string;
  }
  
  export interface RegistrationData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    postCode: string;
    country: string;
    state: string;
    profilePhoto?: string;
    description: string;
    password?: string;
    uid?: any;
  }

  export interface VendorData {
    email: string;
    phone_number: string;
    home_address: string;
    office_address: string;
    profilePhoto?: string;
    description: string;
    taxIdName?: string;
    ssnOrEin?: string;
    panNo?: string;
    businessType?: string;
    bankName?: string;
    bankAccountNo?: string;
  }

  export interface Wishlist {
    title: string;
    newPrice: number;
    waight: any;
    image: string;
    date: string;
    status: string;
  }

  export interface Address {
    id: string;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    state: string;
  }
    
  export interface Country {
    id: number;
    name: any;
    iso2: string;
  }
  
  export interface State {
    id: number;
    name: any;
    state_code: string;
    country_code: string; 
  }
  
  export interface City {
    id: number;
    name: any;
    iso2: string;
  }

  export interface Tag {
    name: string;
  }
  
  export interface LinkAttr {
    name: string;
    href: string;
    slug?: string;
  }

  export interface MenuLinkAttr {
    name: string;
    href: string;
    subname?: LinkAttr[];
  }

  export interface VendorImage {
    index: number;
    image: string;
  }

/**
 * src/types/data.types.ts
 * API'dan keladigan va Komponentlar ishlatadigan tiplar
 */

// Kategoriya nomi yoki mahsulot nomi (ko'p tilli)
interface MultiLangName {
    uz: string;
    ru: string;
}

// Upload obyekti (rasm manzili)
interface Upload {
    id: number;
    file_url: string;
}

// ----------------------------------------
// 📌 Mahsulotga bog'liq Rasm obyekti
interface ProductImage {
    id: number;
    product_id: number;
    upload_id: number;
    is_main: 0 | 1; // Asosiy rasm ekanligi (0 yoki 1)
    order: number;
    created_at: string;
    updated_at: string;
    upload: Upload; // Rasm manzili obyekti
}

// 📌 Mahsulotning batafsil ma'lumotlari
interface ProductDetails {
    id: number;
    product_id: number;
    description: MultiLangName; // Tavsif
    sku: string; // SKU kodi
    weight: string;
    weight_unit: string;
    stock: number; // Zaxirada borligi
    rating_count: number;
    created_at: string;
    updated_at: string;
}

// ----------------------------------------
// 📌 Kategoriya obyekti (Kategoriyalar API'si va Product javobidan)
export interface Category {
    id: number;
    name: MultiLangName;
    upload_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    products_count?: number; // Kategoriyalar API'sida mavjud bo'lishi mumkin
    upload?: Upload; // Kategoriyalar API'sida mavjud bo'lishi mumkin
}

// ----------------------------------------
// 📌 Mahsulot obyekti
export interface Product {
    id: number;
    name: MultiLangName;
    price: string;
    old_price: string;
    rating: number;
    parent_id: number | null;
    category_id: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    images: ProductImage[];
    details: ProductDetails;
    category: Category | null;
}

// ----------------------------------------
// 📌 API Umumiy Javob Tiplari

// Kategoriyalar API'sidan keladigan asosiy javob
export interface CategoryApiResponse {
    status: boolean;
    data: {
        data: Category[];
    };
}

// Mahsulotlar API'sidan keladigan asosiy javob
export interface ProductApiResponse {
    status: boolean;
    data: {
        data: Product[]; // Mahsulotlar massivi shu yerda
    };
}

// ----------------------------------------
// 📌 Komponent Props Tiplari
export interface ProductAllProps {
    categoryId: number | null; // Filtrlash uchun: null = Barchasi
    hasPaginate?: boolean;
}