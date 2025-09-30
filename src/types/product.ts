type Image = {
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

export type Product = {
    id: string
    name: string
    slug: string
    latinName: string
    bulkGrams: number
    reorderAtGrams: number
    descriptionMd: string
    originCountry: string
    organicCert: string
    active: boolean
    variants: ProductVariant[]
    categories: "HERBS" | "SPICES"
    images: Image[]
}