// userController.test.js
const { userSignup } = require("./userController");
const bcrypt = require("bcrypt");
const User = require("./userModel");
const { validateSignUpData } = require("./validators");

jest.mock("bcrypt");
jest.mock("./userModel");
jest.mock("./validators");

describe("userSignup - Unit Test", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        firstName: "John",
        lastName: "Doe",
        emailId: "john@example.com",
        password: "password123"
      }
    };

    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
  });

  it("should create a user successfully", async () => {
    validateSignUpData.mockImplementation(() => {});
    bcrypt.hash.mockResolvedValue("hashedPassword");
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(true)
    }));

    await userSignup(req, res);

    expect(validateSignUpData).toHaveBeenCalledWith(req);
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(res.send).toHaveBeenCalledWith("User Added Successfully");
  });

  it("should handle errors and send status 400", async () => {
    validateSignUpData.mockImplementation(() => { throw new Error("Invalid data"); });

    await userSignup(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.stringContaining("Error saving user:Invalid data"));
  });
});
