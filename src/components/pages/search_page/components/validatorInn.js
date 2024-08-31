export function validateInn(inn) {
  var result = false;

  var checkDigit = function (inn, coefficients) {
    var n = 0;
    for (var i in coefficients) {
      n += coefficients[i] * inn[i];
    }
    return parseInt((n % 11) % 10);
  };
  switch (inn.length) {
    case 10:
      var n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
      if (n10 === parseInt(inn[9])) {
        result = true;
      }
      break;
    case 12:
      var n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      var n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
        result = true;
      }
      break;
  }
  return result;
}
