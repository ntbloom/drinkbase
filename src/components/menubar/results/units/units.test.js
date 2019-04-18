// @format

const units = require('./units');

test('quarter', () => {
  expect(units(0.25)).toBe('1/4');
});

test('half', () => {
  expect(units(0.5)).toBe('1/2');
});

test('three-quarters', () => {
  expect(units(0.75)).toBe('3/4');
});
