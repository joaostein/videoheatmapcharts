var createVideoLengthVotesChart = function (voteData) {
  var data = lengthVotes(voteData);
  nv.addGraph(function() {
    var chart = nv.models.multiBarChart()
      .options({
        showControls: false,
        stacked: true
      });

    chart.xAxis
        .tickFormat(d3.format(',f'));

    chart.yAxis
        .tickFormat(d3.format(',.1d'));

    d3.select('#videoLengthVotes svg')
        .datum(data)
      .transition().duration(500).call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}