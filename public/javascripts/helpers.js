var getData = function (type, month) {
  var data = [];
  for (var day in month) {
    data.push({
      x: parseInt(day),
      y: month[day][type]
    });
  }

  return data;
};