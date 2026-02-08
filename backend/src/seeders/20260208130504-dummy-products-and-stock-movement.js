/** @type {import('sequelize-cli').Migration} */

// ----- PRODUCTS -----
const products = [
  {
    id: 1,
    name: "Sparkling Mineral Water",
    categoryId: 2,
    price: 180,
    unit: "500ml • Case of 24",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3U_VWflk7OxGMTLPeMKssZlOrEK16LrydqBNp8d0yUwueYoi75u9wwi8n6hKwHceCBvXsCiReIih0OFdNLCLs8kqjrJQJAuJA6WciRuyG8kyUMCW4awnAx7RjGD1k6ZvzWElsRsIbYLb7b3P16Obtt37cDuf3cr-D0CIWUvL_6xXSbMq4_6jWWbwhoTim6KZ9EyXHTLpp1RP_uKw31alIbNXghYYX7eisEYMgdSSLyoZqUsv-uPP55Ap6MFioCmgfmoDLqK8OqDU",
    status: "IN_STOCK",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Tropical Mango Juice",
    categoryId: 4,
    price: 120,
    unit: "330ml • No Sugar Added",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyVYoVQMWeJeqvLF4-CXEWFo_lGdbq5aYhfwcri4--LgebZJec91LCZBNX7sjV1U57g24KDZfSDlMthGHC1kycRmMdWYF17fETOVKhq6sKF18UolWAD2lMXcRNmOLpSKmI7nPnkI8wzNHtEhpG71uZUM-8FcjNTLfCIN_XtoIx-DotsYTofSdwNGMI8RtMjWyar1UsSoMmEU8yQ65LhkdpB5t4nbGRHZT45zA_7DXHS2wAgBXs97iOKq30dyNCFaSoyF-aPGNDWEU",
    status: "LOW_STOCK",
    badge: null,
  },
  {
    id: 3,
    name: "Island Zap Energy",
    categoryId: 1,
    price: 250,
    unit: "250ml • High Caffeine",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-seLrLn0ZuyGiVSK4wDN60lRDngeLdEIjc05usucvzanNzDDuhXXBtrTsMI-HdC_uv_u5NzIYCOZ1Zz_bzeizghIa3SEj8Mkga6gv_izUFGXgp-iKPbdHU0kP6IoVaJkI-UYbS8VfQ9EwrrsdIKkxazgizuNx2JPXpCyeukvPlT6YYa4kvCGpyWyOvBYd_Nm-RGTX4ChxInV1ctsq37_jXdHHVARgEmHsWWAQNHX919sYJpR_lltMGSjQ_e7MKo5AqweWY5iEagg",
    status: "IN_STOCK",
    badge: "New",
  },
  {
    id: 4,
    name: "Highland Arabica Beans",
    categoryId: 3,
    price: 250,
    unit: "1kg Bag • Roasted",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5aRcGR3TrIFk8Sqo1UupJibxIexTR0A0Hi8nUDuO_VGKPsgLF-f1Qw9QgfpzHiBdyR_LFnMa-Z6nTl8uswrtHF6UXZ64XmJhTFglfC23OWofE0aXbr0ACJpEHl6NbfhGgAS52HloY3Y1JvrdS3-hFU9unKAm9cVJQy0y7ilj8R8uOVKib5za4NO-e7CaqbWBf_IP_ydZQhrqT4f8m_mu19iXyOYf1xBcttQQcj7T1Pwm5o0zrsNLyE2oi5Qh64HIgYdaDhq9h9DY",
    status: "IN_STOCK",
    badge: null,
  },
];

// ----- STOCK MOVEMENTS -----
const stockMovements = [
  // Coca Cola
  {
    productId: 1,
    type: "IN",
    quantity: 100,
    reason: "Initial stock",
    referenceId: "INIT-COCA",
  },
  {
    productId: 1,
    type: "OUT",
    quantity: 5,
    reason: "Customer order",
    referenceId: "ORDER-1001",
  },

  // Mineral Water
  {
    productId: 2,
    type: "IN",
    quantity: 200,
    reason: "Initial stock",
    referenceId: "INIT-WATER",
  },
  {
    productId: 2,
    type: "OUT",
    quantity: 20,
    reason: "Bulk sale",
    referenceId: "ORDER-1002",
  },

  // Iced Coffee
  {
    productId: 3,
    type: "IN",
    quantity: 50,
    reason: "Initial stock",
    referenceId: "INIT-COFFEE",
  },
  {
    productId: 3,
    type: "ADJUST",
    quantity: -2,
    reason: "Damaged items",
    referenceId: "ADJ-0001",
  },
];

export async function up(queryInterface, Sequelize) {
  const now = new Date();

  // 1️ Insert products first
  await queryInterface.bulkInsert(
    "products",
    products.map((product) => ({
      ...product,
      createdAt: now,
      updatedAt: now,
    })),
  );

  // 2️ Insert stock movements
  await queryInterface.bulkInsert(
    "stock_movements",
    stockMovements.map((stockMovement) => ({
      ...stockMovement,
      createdAt: now,
    })),
  );
}

export async function down(queryInterface, Sequelize) {
  // Order matters (FK)
  await queryInterface.bulkDelete("stock_movements", null);
  await queryInterface.bulkDelete("products", {
    id: products.map((product) => product.id),
  });
}
