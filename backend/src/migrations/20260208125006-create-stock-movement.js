export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("stock_movements", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    productId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // delete stock history if product is deleted
    },

    type: {
      type: Sequelize.ENUM("IN", "OUT", "ADJUST"),
      allowNull: false,
    },

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    reason: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    referenceId: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("NOW"),
    },
  });
}

export async function down(queryInterface, Sequelize) {
  // ENUM must be removed manually in MySQL
  await queryInterface.dropTable("stock_movements");
  await queryInterface.sequelize.query(
    'DROP TYPE IF EXISTS "enum_stock_movements_type";',
  );
}
