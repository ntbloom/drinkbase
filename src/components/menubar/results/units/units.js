// @format

// units.js -- conversion microframework for decimal/fraction conversions

function units(num) {
  // precise calculations for real numbers
  switch (num) {
    case num === 0.25:
      return "1/4";
      break;
    case num === 0.5:
      return "1/2";
      break;
    case num === 0.75:
      return "3/4";
      break;
    case num === 1.25:
      return "1 1/4";
      break;
    case num === 1.5:
      return "1 1/2";
      break;
    case num === 1.75:
      return "1 3/4";
      break;
    default:
      return num;
      break;
  }
}
