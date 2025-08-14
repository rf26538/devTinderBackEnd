// math.test.js
const { add, multiply, greet, greetToPerson } = require("../testMath");
const { describe, it } = require("test");
const assert = require("assert");

// Unit test Case
// ----------Example:1----------- (For this example get "test from test module")

    // test("Shold print string", () => {
    //     const expected = "Hello World!";
    //     const actual = greet("World!");
    
    //     assert.strictEqual(expected, actual)
    // })


// ----------Example:2-----------(For multiple testing get "describe" and "it" from test module)

// describe("Greeting function", () => {
//     it("Shold print string", () => {
//         const expected = "Hello World!";
//         const actual = greet("World!");
    
//         assert.strictEqual(expected, actual)
//     })
    
//     it("Shold print string", () => {
//         const expected = "Hello Rehan";
//         const actual = greetToPerson("Rehan");
    
//         assert.strictEqual(expected, actual)
//     })
// })

// describe("Add and multiply function", () => {
//     it("shold resturn added value", () => {
//         assert.strictEqual(8, add(3,5))
//     })

//     it("Should return multiplied value", () => {
//         assert.strictEqual(25, multiply(5,5))
//     })
// })

// Jest test Case
// describe("Math functions", () => {
//   test("should add two numbers", () => {
//     expect(add(2, 3)).toBe(5);
//   });

//   test("should multiply two numbers", () => {
//     expect(multiply(4, 5)).toBe(20);
//   });
// });
