var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var months = {};

d3.json('javascripts/votes.json', function (error, data) {
  for (var i = 0; i < data.length; i++) {
    parseData(data[i]);
  }
  createLineDaysVotes(months);
});

var parseData = function (entry) {
  var date = new Date(entry.createdAt);
  var monthName = monthNames[date.getMonth()];
  var monthDay = date.getDate();

  !!!months[monthName] && ( months[monthName] = createMonth() );

  var votes = months[monthName].days[monthDay];

  votes.all += 1;
  entry.vote === 1 ? votes.positive += 1 : votes.negative += 1;
  votes.x = monthDay;
  votes.y = votes.all;
};

var createMonth = function () {
  var month = {
    days: {}
  };

  for (var i = 1; i <= 31; i++ ) {
    month.days[i] = createDay();
  }

  return month;
};

var createDay = function () {
  return {
    all: 0,
    positive: 0,
    negative: 0
  };
};
