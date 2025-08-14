const { describe, mock, test, it } = require("test");
const assert = require("assert");

const { processOrder } = require("../testMath");

describe("Order Feature", () => {
    it("Should use mock data", () => {
        const mockedProcessPaymet = mock.fn((amount) => {
            console.log("I am moked.... data");

            return {id: "123", amount:amount};
        })

        const expected = {id: "123", amount:100 };
        assert.strictEqual(mockedProcessPaymet.mock.callCount(), 0); //<mock called to be as Spy
        const result = processOrder({amount : 100}, {processPayment : mockedProcessPaymet});

        assert.deepStrictEqual(result);
        assert.strictEqual(mockedProcessPaymet.mock.callCount(), 1);

        const call = mockedProcessPaymet.mock.calls[0];
        assert.deepStrictEqual(call.arguments, [100]);
    })
})
