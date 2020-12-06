const sinon = require("sinon");
const assert = require("assert");
const morseTest = require("../src/morse");

describe("morse encoding test", function () {
    it("should encode a string", function () {
        assert.equal(morseTest.morseEncode(" I AM IN TROUBLE"), "2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1");
    });

    it("should encode a string which contains a line break", function () {
        assert.equal(morseTest.morseEncode("hello\nI AM IN TROUBLE"), "4|1|1A2|1A2|C\n2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1");
    });

    it("should throw an error when input cannot be encoded", function () {
        assert.throws(() => { morseTest.morseEncode("%&/("); }, Error, "Not valid to encode");
    });
});