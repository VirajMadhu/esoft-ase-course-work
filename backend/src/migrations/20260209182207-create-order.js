export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("orders", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    order_number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.ENUM("PENDING", "PAID", "SHIPPED", "CANCELLED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    subtotal: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    tax: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    },
    total_amount: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    payment_method: {
      type: Sequelize.ENUM("CASH", "CARD", "ONLINE"),
      allowNull: false,
      defaultValue: "CASH",
    },
    payment_status: {
      type: Sequelize.ENUM("PENDING", "PAID", "CANCELLED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("orders");
}
