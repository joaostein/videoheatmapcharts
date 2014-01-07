angular.module('sleepData', [])
  .controller('mainController', function ($scope) {

  })
  .directive('ngVisualization', function (D3Service) {
    return {
      restrict: 'A',
      scope: {},
      link: function (scope, element, attrs) {
        var w = 400;
        var h = 200;
        var margin = 20;
        var y = d3.scale.linear().domain([0, d3.max(data)]).range([0 + margin, h - margin]);
        var x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin]);

        var svg = D3Service.createSvg(w, h, element[0]);

        var group = svg.append('g')
            .attr('transform', 'translate(0, 200)');

        var line = d3.svg.line()
            .x(function(d,i) { return x(i); })
            .y(function(d) { return -1 * y(d); })

        group.append('path').attr({
          'd': line(data)
        });

        group.append('line')
            .attr('x1', x(0))
            .attr('y1', -1 * y(0))
            .attr('x2', x(w))
            .attr('y2', -1 * y(0))

        group.append('line')
            .attr('x1', x(0))
            .attr('y1', -1 * y(0))
            .attr('x2', x(0))
            .attr('y2', -1 * y(d3.max(data)))

        group.selectAll('.xLabel')
            .data(x.ticks(5))
            .enter().append('text')
            .attr('class', 'xLabel')
            .text(String)
            .attr('x', function(d) { return x(d) })
            .attr('y', 0)
            .attr('text-anchor', 'middle')

        group.selectAll('.yLabel')
            .data(y.ticks(4))
            .enter().append('svg:text')
            .attr('class', 'yLabel')
            .text(String)
            .attr('x', 0)
            .attr('y', function(d) { return -1 * y(d) })
            .attr('text-anchor', 'right')
            .attr('dy', 4)

        group.selectAll('.xTicks')
            .data(x.ticks(5))
            .enter().append('line')
            .attr('class', 'xTicks')
            .attr('x1', function(d) { return x(d); })
            .attr('y1', -1 * y(0))
            .attr('x2', function(d) { return x(d); })
            .attr('y2', -1 * y(-0.3))

        group.selectAll('.yTicks')
            .data(y.ticks(4))
            .enter().append('line')
            .attr('class', 'yTicks')
            .attr('y1', function(d) { return -1 * y(d); })
            .attr('x1', x(-0.3))
            .attr('y2', function(d) { return -1 * y(d); })
            .attr('x2', x(0))
      }
    }
  })