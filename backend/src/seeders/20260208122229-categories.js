/** @type {import('sequelize-cli').Migration} */

// Seed data
const categories = [
  { id: "1", name: "Soft Drinks" },
  { id: "2", name: "Mineral Water" },
  { id: "3", name: "Coffee & Tea" },
  { id: "4", name: "Fresh Juices" },
];

export async function up(queryInterface, Sequelize) {
  // Add timestamps for Sequelize
  const data = categories.map((category) => ({
    ...category,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await queryInterface.bulkInsert("categories", data, {});
}

export async function down(queryInterface, Sequelize) {
  // Remove all seeded categories
  await queryInterface.bulkDelete("categories", {
    id: categories.map((cat) => cat.id),
  });
}
