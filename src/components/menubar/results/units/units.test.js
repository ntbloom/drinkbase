// @format

const units = require("./units");

test("quarter", () => {
  expect(units(0.25)).toBe("1/4");
});
