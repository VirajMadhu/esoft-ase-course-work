import { jest } from "@jest/globals";

const mockCategory = {
  findAll: jest.fn(),
};
const mockProduct = {};

await jest.unstable_mockModule("../../src/models/index.js", () => ({
  default: {
    Category: mockCategory,
    Product: mockProduct,
  },
}));

const { getAllCategories } =
  await import("../../src/services/categories.service.js");

describe("categories.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllCategories", () => {
    it("should fetch all categories and append 'All Products' option", async () => {
      mockCategory.findAll.mockResolvedValue([
        {
          id: 1,
          name: "Category A",
          get: jest.fn().mockReturnValue(10),
        },
        {
          id: 2,
          name: "Category B",
          get: jest.fn().mockReturnValue(20),
        },
      ]);

      const result = await getAllCategories();

      expect(mockCategory.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(3);
      expect(result[0].name).toBe("All Products");
      expect(result[0].count).toBe(30);
      expect(result[1].name).toBe("Category A");
    });

    it("should return an empty array and log error if fetch fails", async () => {
      mockCategory.findAll.mockRejectedValue(new Error("DB Error"));
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      const result = await getAllCategories();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
