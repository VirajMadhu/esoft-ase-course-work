export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("products", "sku", {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  });
}

export async function down(queryInterface) {
  await queryInterface.removeColumn("products", "sku");
}
