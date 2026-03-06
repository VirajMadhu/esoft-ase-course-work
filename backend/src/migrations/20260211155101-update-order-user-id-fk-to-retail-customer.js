export async function up(queryInterface, Sequelize) {
  // Step 1: Remove old constraints safely
  const constraints = ["orders_ibfk_1", "orders_user_id_fkey"];
  for (const constraint of constraints) {
    try {
      await queryInterface.removeConstraint("orders", constraint);
      console.log(`Removed constraint: ${constraint}`);
    } catch (e) {
      console.log(`Constraint ${constraint} not found, skipping...`);
    }
  }

  // Step 2: Keep NOT NULL (no need to change to allowNull: true)

  // Step 3: Update data if needed (adjust IDs based on your real data!)
  await queryInterface.sequelize.query(`
    UPDATE orders 
    SET user_id = 1
    WHERE user_id = 1;
  `);
  // Add more UPDATEs for other IDs if necessary

  // Step 4: Add correct foreign key with RESTRICT
  await queryInterface.addConstraint("orders", {
    fields: ["user_id"],
    type: "foreign key",
    name: "orders_user_id_fkey",
    references: {
      table: "retail_customers",
      field: "id",
    },
    onDelete: "RESTRICT", // prevents deleting customer if orders exist
    onUpdate: "CASCADE",
  });
}

export async function down(queryInterface) {
  try {
    await queryInterface.removeConstraint("orders", "orders_user_id_fkey");
  } catch (e) {
    console.log("Constraint not found in down, skipping");
  }
}
