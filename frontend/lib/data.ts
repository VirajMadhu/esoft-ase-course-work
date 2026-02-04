export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
    image: string;
    status: "in-stock" | "low-stock" | "out-of-stock";
    badge?: string;
}

export interface Category {
    id: string;
    name: string;
    count: number;
}

export interface CartItem {
    id: string;
    productId: string;
    name: string;
    unit: string;
    quantity: number;
    price: number;
    image: string;
}

export const categories: Category[] = [
    { id: "all", name: "All Products", count: 248 },
    { id: "soft-drinks", name: "Soft Drinks", count: 42 },
    { id: "mineral-water", name: "Mineral Water", count: 18 },
    { id: "coffee-tea", name: "Coffee & Tea", count: 35 },
    { id: "fresh-juices", name: "Fresh Juices", count: 22 },
];

export const products: Product[] = [
    {
        id: "1",
        name: "Sparkling Mineral Water",
        category: "Mineral Water",
        price: 1.20,
        unit: "500ml • Case of 24",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3U_VWflk7OxGMTLPeMKssZlOrEK16LrydqBNp8d0yUwueYoi75u9wwi8n6hKwHceCBvXsCiReIih0OFdNLCLs8kqjrJQJAuJA6WciRuyG8kyUMCW4awnAx7RjGD1k6ZvzWElsRsIbYLb7b3P16Obtt37cDuf3cr-D0CIWUvL_6xXSbMq4_6jWWbwhoTim6KZ9EyXHTLpp1RP_uKw31alIbNXghYYX7eisEYMgdSSLyoZqUsv-uPP55Ap6MFioCmgfmoDLqK8OqDU",
        status: "in-stock",
        badge: "Popular",
    },
    {
        id: "2",
        name: "Highland Arabica Beans",
        category: "Coffee & Tea",
        price: 15.50,
        unit: "1kg Bag • Roasted",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aRcGR3TrIFk8Sqo1UupJibxIexTR0A0Hi8nUDuO_VGKPsgLF-f1Qw9QgfpzHiBdyR_LFnMa-Z6nTl8uswrtHF6UXZ64XmJhTFglfC23OWofE0aXbr0ACJpEHl6NbfhGgAS52HloY3Y1JvrdS3-hFU9unKAm9cVJQy0y7ilj8R8uOVKib5za4NO-e7CaqbWBf_IP_ydZQhrqT4f8m_mu19iXyOYf1xBcttQQcj7T1Pwm5o0zrsNLyE2oi5Qh64HIgYdaDhq9h9DY",
        status: "in-stock",
    },
    {
        id: "3",
        name: "Tropical Mango Juice",
        category: "Fresh Juices",
        price: 2.40,
        unit: "330ml • No Sugar Added",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyVYoVQMWeJeqvLF4-CXEWFo_lGdbq5aYhfwcri4--LgebZJec91LCZBNX7sjV1U57g24KDZfSDlMthGHC1kycRmMdWYF17fETOVKhq6sKF18UolWAD2lMXcRNmOLpSKmI7nPnkI8wzNHtEhpG71uZUM-8FcjNTLfCIN_XtoIx-DotsYTofSdwNGMI8RtMjWyar1UsSoMmEU8yQ65LhkdpB5t4nbGRHZT45zA_7DXHS2wAgBXs97iOKq30dyNCFaSoyF-aPGNDWEU",
        status: "low-stock",
    },
    {
        id: "4",
        name: "Island Zap Energy",
        category: "Soft Drinks",
        price: 1.80,
        unit: "250ml • High Caffeine",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-seLrLn0ZuyGiVSK4wDN60lRDngeLdEIjc05usucvzanNzDDuhXXBtrTsMI-HdC_uv_u5NzIYCOZ1Zz_bzeizghIa3SEj8Mkga6gv_izUFGXgp-iKPbdHU0kP6IoVaJkI-UYbS8VfQ9EwrrsdIKkxazgizuNx2JPXpCyeukvPlT6YYa4kvCGpyWyOvBYd_Nm-RGTX4ChxInV1ctsq37_jXdHHVARgEmHsWWAQNHX919sYJpR_lltMGSjQ_e7MKo5AqweWY5iEagg",
        status: "in-stock",
    },
];

export const cartItems: CartItem[] = [
    {
        id: "cart-1",
        productId: "1",
        name: "Sparkling Mineral Water",
        unit: "Case (24)",
        quantity: 2,
        price: 1.20,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQtUf0pRw3wR4TvOEt92SGTCMCMHVagGLDL1ZNZem3jOjVnH6j95IDA690M4s4YCF7NQ2XZuiOsDsi8gsofMJ68nne3jfitsg2JP-Y6x-4mNKQEE15kQdxUiOBxhqZanBXAdIfkERuzSXmGodKl67c3YyPZxEV5UBFurlMOui9RaJqIpIFWdI0WhJzQJsEb-p7yZgDeNq-cr6itsNCakVSJOwpv1YFTNVPigZvtYYoPgGxq4dvAWjMDBtDN0J-IrZoGlgjV7DoclM",
    },
    {
        id: "cart-2",
        productId: "2",
        name: "Highland Arabica Beans",
        unit: "1kg Bag",
        quantity: 1,
        price: 15.50,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7Qg6P9Ly6VTM96DboRFCku4SIn_E_qrIaWrvewR7lXduD-1iktti6Qi7hDzvndAZiANzf-ytW52ND2Wvl0QzRcOkrgsVZ2ywH9xskJrFhVa3EWIApdxUsqcPegjz4ms7DO9ktOmcM3Uv3NGVweLx7lxi3p1LlKMTpctlBfDzcijMyDLr03zy6Gme8hnh9I_lowEsv8XjCZL3UKGY8EbA4iPcw5XlYjzQUhtzZ0gsL7AfQZOYyHji4VocbQ_BQm7s7FsS6ONNLTUE",
    },
    {
        id: "cart-3",
        productId: "3",
        name: "Tropical Mango Juice",
        unit: "330ml Bottle",
        quantity: 1,
        price: 2.40,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyVYoVQMWeJeqvLF4-CXEWFo_lGdbq5aYhfwcri4--LgebZJec91LCZBNX7sjV1U57g24KDZfSDlMthGHC1kycRmMdWYF17fETOVKhq6sKF18UolWAD2lMXcRNmOLpSKmI7nPnkI8wzNHtEhpG71uZUM-8FcjNTLfCIN_XtoIx-DotsYTofSdwNGMI8RtMjWyar1UsSoMmEU8yQ65LhkdpB5t4nbGRHZT45zA_7DXHS2wAgBXs97iOKq30dyNCFaSoyF-aPGNDWEU",
    },
];