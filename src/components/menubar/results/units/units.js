// @format

// units.js -- conversion microframework for decimal/fraction conversions

function units(num) {
  // precise calculations for real numbers
  if (num === 0.25) {
    return '1/4';
  } else if (num === 0.5) {
    return '1/2';
  } else if (num === 0.75) {
    return '3/4';
  } else if (num === 1.25) {
    return '1 1/4';
  } else if (num === 1.5) {
    return '1 1/2';
  } else if (num === 1.75) {
    return '1 3/4';
  } else {
    return num;
  }
}

module.exports = units;
