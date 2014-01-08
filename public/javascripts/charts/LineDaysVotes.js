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

var createLineDaysVotesChart = function (voteData) {
  var data = daysVotes(voteData);
  var chart;
  nv.addGraph(function() {
    chart = nv.models.lineChart()
    .options({
      margin: {
        left: 100,
        bottom: 100,
      },
      showLegend: true
    });

    chart.xAxis
      .axisLabel("Days")
      .tickFormat(d3.format('0d'));

    chart.yAxis
      .axisLabel('Quantity of votes')

    d3.select('#daysVotes svg')
      .datum(data)
      .call(chart);

    nv.utils.windowResize(chart.update);
    chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
    return chart;
  });
};