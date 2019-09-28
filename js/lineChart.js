var margin = {top: 10, right: 0, bottom: 10, left: 0},
  width = window.innerWidth - margin.left - margin.right,
  height = 100 - margin.top - margin.bottom;

var n = 30;

var xScale = d3.scaleLinear()
  .domain([0, n-1])
  .range([0, width]);

var yScale = d3.scaleLinear()
  .domain([0, 1])
  .range([height, 0]);

var line = d3.line()
  .x(function(d, i) { return xScale(i); })
  .y(function(d) { return yScale(d.y); })
  .curve(d3.curveMonotoneX)

var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

var svg = d3.select("#barchart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("path")
  .datum(dataset)
  .attr("class", "line")
  .attr("d", line);
