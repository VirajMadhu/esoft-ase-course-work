import { jest } from "@jest/globals";

// Partial mock of db
const mockProduct = {
  count: jest.fn(),
  findAll: jest.fn(),
};
const mockCategory = {};
const mockStockMovement = {};

await jest.unstable_mockModule("../../src/models/index.js", () => ({
  default: {
    Product: mockProduct,
    Category: mockCategory,
    StockMovement: mockStockMovement,
  },
}));

// Import the service after mocking
const { getAllProducts } =
  await import("../../src/services/products.service.js");

describe("products.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should fetch products with default parameters", async () => {
      mockProduct.count.mockResolvedValue(10);
      mockProduct.findAll.mockResolvedValue([
        {
          id: 1,
          name: "Test Product",
          price: 100,
          unit: "kg",
          image: "test.jpg",
          status: "AVAILABLE",
          badge: "NEW",
          get: jest.fn().mockReturnValue(50), // stockCount
          category: { id: 1, name: "Test Category" },
        },
      ]);

      const result = await getAllProducts({});

      expect(mockProduct.count).toHaveBeenCalled();
      expect(mockProduct.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: 8,
          offset: 0,
        }),
      );
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe("Test Product");
      expect(result.meta.total).toBe(10);
    });

    it("should apply search filter when search parameter is provided", async () => {
      mockProduct.count.mockResolvedValue(1);
      mockProduct.findAll.mockResolvedValue([]);

      await getAllProducts({ search: "apple" });

      expect(mockProduct.count).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            name: expect.any(Object),
          }),
        }),
      );
    });
  });
});
