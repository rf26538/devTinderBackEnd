// upload.test.js
const request = require("supertest");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const app = require("./upload");

// Mock AWS S3
jest.mock("aws-sdk", () => {
  const mS3 = { upload: jest.fn().mockReturnThis(), promise: jest.fn() };
  return { S3: jest.fn(() => mS3), config: { update: jest.fn() } };
});

describe("POST /upload", () => {
  it("should upload file to S3", async () => {
    const testFilePath = path.join(__dirname, "test.txt");
    fs.writeFileSync(testFilePath, "Hello world");

    AWS.S3().promise.mockResolvedValue({ Location: "http://s3-url/file.txt" });

    const res = await request(app)
      .post("/upload")
      .attach("file", testFilePath);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("File uploaded successfully");
    expect(res.body.url).toBe("http://s3-url/file.txt");

    fs.unlinkSync(testFilePath);
  });
});

