/** @type {import('sequelize-cli').Migration} */

// ----- PRODUCTS -----
const products = [
  {
    id: 1,
    name: "Sparkling Mineral Water",
    categoryId: 2,
    price: 180,
    unit: "500ml • Case of 24",
    image: "https://i.ibb.co/vCqR2DxT/Sparkling-Mineral-Water.png",
    status: "IN_STOCK",
    badge: "Popular",
  },
  {
    id: 2,
    name: "Tropical Mango Juice",
    categoryId: 4,
    price: 120,
    unit: "330ml • No Sugar Added",
    image: "https://i.ibb.co/9kNXFqWG/Tropical-Mango-Juice.png",
    status: "LOW_STOCK",
    badge: null,
  },
  {
    id: 3,
    name: "Island Zap Energy",
    categoryId: 1,
    price: 250,
    unit: "250ml • High Caffeine",
    image: "https://i.ibb.co/j9CrLTM4/Island-Zap-Energy.png",
    status: "IN_STOCK",
    badge: "New",
  },
  {
    id: 4,
    name: "Highland Arabica Beans",
    categoryId: 3,
    price: 250,
    unit: "1kg Bag • Roasted",
    image: "https://i.ibb.co/CKZZJWRP/Highland-Arabica-Beans.png",
    status: "IN_STOCK",
    badge: null,
  },
  {
    id: 5,
    name: "Organic Apple Juice",
    categoryId: 4,
    price: 150,
    unit: "500ml Bottle",
    image: "https://i.ibb.co/JFB6Z10M/Organic-Apple-Juice.png",
    status: "IN_STOCK",
    badge: "Popular",
  },
  {
    id: 6,
    name: "Coca Cola Classic",
    categoryId: 1,
    price: 200,
    unit: "330ml Can",
    image: "https://i.ibb.co/pcNsY02/Coca-Cola-Classic.png",
    status: "IN_STOCK",
    badge: "Popular",
  },
  {
    id: 7,
    name: "Peach Iced Tea",
    categoryId: 4,
    price: 130,
    unit: "500ml Bottle",
    image: "https://i.ibb.co/nXBJz64/Peach-Iced-Tea.png",
    status: "LOW_STOCK",
    badge: null,
  },
  {
    id: 8,
    name: "Espresso Ground Coffee",
    categoryId: 3,
    price: 300,
    unit: "250g Pack",
    image: "https://i.ibb.co/WNBwRykF/Espresso-Ground-Coffee.png",
    status: "IN_STOCK",
    badge: "New",
  },
  {
    id: 9,
    name: "Green Tea Bags",
    categoryId: 3,
    price: 180,
    unit: "20 Bags",
    image: "https://i.ibb.co/R4bJ890T/Green-Tea-Bags.png",
    status: "IN_STOCK",
    badge: null,
  },
  {
    id: 10,
    name: "Lemon Sparkling Water",
    categoryId: 2,
    price: 175,
    unit: "500ml Bottle",
    image: "https://i.ibb.co/GvRSZ2Kh/Lemon-Sparkling-Water.png",
    status: "IN_STOCK",
    badge: null,
  },
];

// ----- STOCK MOVEMENTS -----
const generateStockMovements = () => {
  const stockMovements = [];
  for (let product of products) {
    // Initial stock
    const initialQty = Math.floor(Math.random() * 200) + 50;
    stockMovements.push({
      productId: product.id,
      type: "IN",
      quantity: initialQty,
      reason: "Initial stock",
      referenceId: `INIT-${product.id}`,
    });

    // Random outflow
    const outQty = Math.floor(Math.random() * 50);
    if (outQty > 0) {
      stockMovements.push({
        productId: product.id,
        type: "OUT",
        quantity: outQty,
        reason: "Customer orders",
        referenceId: `OUT-${product.id}`,
      });
    }

    // Random adjustments
    const adjQty = Math.floor(Math.random() * 10) - 5; // -5 to +4
    if (adjQty !== 0) {
      stockMovements.push({
        productId: product.id,
        type: "ADJUST",
        quantity: adjQty,
        reason: "Stock adjustment",
        referenceId: `ADJ-${product.id}`,
      });
    }
  }
  return stockMovements;
};

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("stock_movements", null);
  await queryInterface.bulkDelete("products", {
    id: products.map((product) => product.id),
  });

  const now = new Date();
  const stockMovements = generateStockMovements();

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
