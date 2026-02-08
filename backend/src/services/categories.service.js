import { fn, col, literal } from "@sequelize/core";
import db from "../models/index.js";

const { Category, Product } = db;

export async function getAllCategories() {
  try {
    // Get category-wise counts
    const categories = await Category.findAll({
      attributes: ["id", "name", [fn("COUNT", col("products.id")), "count"]],
      include: [
        {
          model: Product,
          as: "products",
          attributes: [],
        },
      ],
      group: ["Category.id"],
      order: [["name", "ASC"]],
    });

    // Map categories
    const mappedCategories = categories.map((category) => ({
      id: category.id,
      name: category.name,
      count: Number(category.get("count")) || 0,
    }));

    // Calculate total products count for "All Products"
    const totalCount = mappedCategories.reduce(
      (acc, cat) => acc + cat.count,
      0,
    );

    // Prepend the "All Products" item
    return [
      {
        id: 0,
        name: "All Products",
        count: totalCount,
      },
      ...mappedCategories,
    ];
  } catch (error) {
    console.log(error);
    return [];
  }
}
