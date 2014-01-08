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

var daysVotes = function (voteData) {
  var januaryDays = voteData.january.days;

  return [
    {
      key: 'All Votes',
      values: getData('all', januaryDays),
      color: '#ff7f0e'
    },
    {
      key: 'Positive Votes',
      values: getData('positive', januaryDays),
      color: '#0CBE0A'
    },
    {
      key: 'Negative Votes',
      values: getData('negative', januaryDays),
      color: '#D62728'
    }
  ];
};