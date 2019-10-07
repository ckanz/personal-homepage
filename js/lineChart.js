var drawLineChart = function(data = []) {
  var margin = {top: 50, right: 0, bottom: 50, left: 0},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight / 5 - margin.top - margin.bottom;

  var xScale = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

  var yScale = d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([height, 0]);

  var line = d3.line()
    .x(function(d, i) { return xScale(i); })
    .y(function(d) { return yScale(d); })
    .curve(d3.curveMonotoneX);

  var svg = d3.select("#barchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var line = svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

  setTimeout(function() {
    line
      .style('opacity', 0.25)
      .style('stroke-dasharray', '2, 5');
  }, 100)
}
