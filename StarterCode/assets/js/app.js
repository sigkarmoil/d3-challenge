// Load all data
d3.csv("assets/data/data.csv").then(function(data) {

    // console.log(data);

    // log a list of names
    var poverty = data.map(d => d.poverty);
    console.log("poverty", poverty);

    var obesity = data.map(d => d.obesity);
    console.log("obesity", obesity);

    // svg container
    var svgHeight = 600;
    var svgWidth = 1000;

    // margins
    var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    };

    // chart area minus margins
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;

    // create svg container
    var svg = d3.select("#scatter").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    // shift everything over by the margins
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // var bubble parameter
    var cRad = 10;

    // scale x to chart width
    var xScale = d3.scaleBand()
        .domain(poverty)
        .range([0, chartWidth])
        .padding(0.05);

    // scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(obesity)])
        .range([chartHeight, 0]);

    // Append Data to chartGroup
    chartGroup.selectAll(".bubble")
    .data(obesity)
    .enter()
    .append("circle")
    .classed("bubble", true)
    .attr("cx", (d, i) => xScale(poverty[i]))
    .attr("cy", d => yScale(d))
    .attr("r", cRad )
    .attr("fill","pink")
    .attr("stroke","white")
    .attr("stroke-width", "2")

  }).catch(function(error) {
    console.log(error);
  });
  