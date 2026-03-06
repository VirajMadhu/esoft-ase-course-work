export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("stock_transfers", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fromProductId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
      onDelete: "CASCADE",
    },
    toProductId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "products", key: "id" },
      onDelete: "CASCADE",
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    reason: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM(
        "REQUESTED",
        "APPROVED",
        "DISPATCHED",
        "RECEIVED",
        "REJECTED",
      ),
      defaultValue: "REQUESTED",
    },
    requestedBy: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      allowNull: true,
    },
    approvedBy: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("stock_transfers");
}
