// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 500;

var margin = {
  top: 50,
  right: 100,
  bottom: 50,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// shift by left and top margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("assets/data/data.csv")
.then(function(pvobData) {

// Parse Data/Cast as numbers
    pvobData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity; 
      });
// view data 
      console.log(pvobData);

// Scale functions
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(pvobData, d => d.poverty)])
      .range([0, width]);
      
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(pvobData, d => d.obesity)])
      .range([height, 0]);

// Axis functions
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

// Append Axes to the chart
    
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

// Create Circles
    
    var circlesGroup = chartGroup.selectAll("circle")
    .data(pvobData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "12")
    .attr("fill", "purple")
    .attr("opacity", ".4")
    .style("stroke", "pink")
    .style("stroke-width", 3);

// tool tip
    
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`<strong>${d.state}<br>Obesity: ${d.obesity}<br>Poverty:${d.poverty}</strong>`);
      });

// call tooltip 
    
    chartGroup.call(toolTip);

// event listeners to display and hide the tooltip


    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
      })

        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
        
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left )
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obesity")
      .style('fill', 'black')
      .style("stroke", "pink")
      .style("stroke-width", .3)
      .style("text", "bold");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + 40})`)
      .attr("class", "axisText")
      .text("Poverty")
      .style('fill', 'black')
      .style("stroke", "pink")
      .style("stroke-width", .3);

      




});