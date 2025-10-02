export interface IImage {
    url: string;
    alt: string;
}

export type ProductVariant = {
    id: string;
    productId: string;
    sku: string;
    name: string;
    packSizeGrams: number;
    price: number;
    currency: string;
    taxClass: string;
    active: boolean;
}

export type ProductVariantDTO = Omit<ProductVariant, 'id' | 'productId' | 'sku'>
export type ProductVariantCreateDTO_afterProduct = Omit<ProductVariant, 'id'>

export type Category = "HERBS" | "SPICES";
export type Product = {
    id: string
    name: string
    slug: string
    latinName: string
    bulkGrams: number
    reorderAtGrams: number
    descriptionMd: string
    originCountry: string
    organicCert: string | null
    active: boolean
    variants: ProductVariant[]
    categories: Category[]
    images: IImage[]
}

export type ProductCreateDTO = Omit<Product, 'id'>
