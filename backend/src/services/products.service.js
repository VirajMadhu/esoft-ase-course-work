import { fn, literal, Op } from "@sequelize/core";
import db from "../models/index.js";
import { PRODUCT_SORT_OPTIONS } from "../constants/productSort.js";

const { Product, Category, StockMovement } = db;

export async function getAllProducts({
  page = 1,
  limit = 8,
  sort = PRODUCT_SORT_OPTIONS[0].value,
  category = 0,
  search = "",
}) {
  try {
    page = Number(page);
    limit = Number(limit);
    category = category && category !== "0" ? String(category) : null;

    const offset = (page - 1) * limit;

    let order = [];
    if (sort === PRODUCT_SORT_OPTIONS[0].value) order = [["createdAt", "DESC"]];
    if (sort === PRODUCT_SORT_OPTIONS[1].value) order = [["price", "ASC"]];
    if (sort === PRODUCT_SORT_OPTIONS[2].value) order = [["price", "DESC"]];

    const where = {};
    if (category) where.categoryId = category;
    if (search) {
      where.name = {
        [Op.like]: `%${search}%`,
      };
    }

    const total = await Product.count({ where });

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name"],
        },
        {
          model: StockMovement,
          as: "stockMovements",
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            fn(
              "SUM",
              literal(`
                CASE
                  WHEN stockMovements.type = 'IN' THEN stockMovements.quantity
                  WHEN stockMovements.type = 'OUT' THEN -stockMovements.quantity
                  WHEN stockMovements.type = 'ADJUST' THEN stockMovements.quantity
                  ELSE 0
                END
              `),
            ),
            "stockCount",
          ],
        ],
      },
      group: ["Product.id", "category.id"],
      order,
      limit,
      offset,
      subQuery: false,
    });

    return {
      data: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        status: product.status,
        badge: product.badge,
        stockCount: Number(product.get("stockCount")) || 0,
        category: product.category,
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
