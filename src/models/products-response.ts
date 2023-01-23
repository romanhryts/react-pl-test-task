export interface ProductsResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: ProductResponseData[];
    support: ProductResponseSupport;
}

export interface ProductResponseData {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}

interface ProductResponseSupport {
    url: string;
    text: string;
}
