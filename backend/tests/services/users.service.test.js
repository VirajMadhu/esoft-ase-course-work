import { jest } from "@jest/globals";

const mockUser = {
  findAll: jest.fn(),
  create: jest.fn(),
};

await jest.unstable_mockModule("../../src/models/User.js", () => ({
  default: mockUser,
}));

const { getAllUsers, createUser } =
  await import("../../src/services/users.service.js");

describe("users.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      mockUser.findAll.mockResolvedValue([{ id: 1, name: "John" }]);
      const result = await getAllUsers();
      expect(mockUser.findAll).toHaveBeenCalled();
      expect(result).toHaveLength(1);
    });
  });

  describe("createUser", () => {
    it("should create a new user when name and email are provided", async () => {
      const userData = { name: "Jane", email: "jane@example.com" };
      mockUser.create.mockResolvedValue({ id: 2, ...userData });

      const result = await createUser(userData);

      expect(mockUser.create).toHaveBeenCalledWith(userData);
      expect(result.id).toBe(2);
    });

    it("should throw error if name or email is missing", async () => {
      await expect(createUser({ name: "Jane" })).rejects.toThrow(
        "Name and email are required",
      );
      await expect(createUser({ email: "jane@example.com" })).rejects.toThrow(
        "Name and email are required",
      );
    });
  });
});
