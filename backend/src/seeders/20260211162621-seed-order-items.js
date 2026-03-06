export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert(
    "order_items",
    [
      {
        orderId: 1,
        productId: 1,
        quantity: 5,
        unitPrice: 180.0,
        lineTotal: 900.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 1,
        productId: 6,
        quantity: 12,
        unitPrice: 200.0,
        lineTotal: 2400.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 3,
        quantity: 24,
        unitPrice: 250.0,
        lineTotal: 6000.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 2,
        productId: 8,
        quantity: 3,
        unitPrice: 300.0,
        lineTotal: 900.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: 3,
        productId: 5,
        quantity: 10,
        unitPrice: 150.0,
        lineTotal: 1500.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("order_items", null, {});
}
