function rect() {
			var dataset = [];  						
			for (var i = 0; i < 20; i++) {			 
				var newNumber = (Math.random()*50);  
				dataset = dataset.concat(newNumber); 
			}
			d3.select("bar").selectAll("div")
				.data(dataset)
				.enter()
				.append("div")
				.attr("class", "bar")
				.transition()
				.duration(2000)
				.ease("elastic")
				.style("width", function(d) {
					var barHeight = d;
					return barHeight + "px";
				})
	}
	
	
function circles(){

var w = screen.width,
    h = screen.height;

var svg = d3.select("c")
  .append("svg:svg")
	.attr("width", w)
    .attr("height", h)
	.style("position","fixed")
	.style("left","0px")
	.style("right","0px")
	.style("z-index","-1")
    .append("svg:g");
	


var gradient = svg.append("svg:defs")
  .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "50%")
    .attr("y2", "0%");

gradient.append("svg:stop")
    .attr("offset", "20%")
    .attr("stop-color", "#000000");

gradient.append("svg:stop")
    .attr("offset", "50%")
    .attr("stop-color", "#FFFFFF");

gradient.append("svg:stop")
    .attr("offset", "100%")
    .attr("stop-color", "#FFFFFF");

	
	

svg.selectAll("circle")
    .data(d3.range(0, 10, 1))
    .enter().append("svg:circle")
	
	.attr("transform", function(xy){
	//return ("translate("+(screen.width/2)+","+Math.random()*h+")")})
	return ("translate("+(screen.width-20)+","+screen.height/2+")")})
	
	.attr("fill-opacity", "0.0")
	.attr("fill", "white")
	.attr("id","circle")
	
	.transition()
	.ease("elastic")
	.duration(5000)
	.attr("opacity", "0.5")
	.attr("stroke", "url(#gradient)")
	.attr("stroke-width", function(s)  {
		return Math.random()*10;
	})
	
	.attr("r", function(s)  {
		return Math.random()*500;
	});


	svg.selectAll("circle")
	
	.attr("r","0");

}	