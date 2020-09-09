// Load all data
d3.csv("assets/data/data.csv").then(function(data) {

    // console.log(data);

    // log a list of names
    var poverty = data.map(d => d.poverty);
 
    // console.log("poverty", poverty);

    var obesity = data.map(d => d.obesity);

    // console.log("obesity", obesity);


    var state = data.map(d => d.abbr);
    console.log("obesity", state);

    // svg container
    var svgHeight = 400;
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
    // var xScale = d3.scaleBand()
    //     .domain(poverty)
    //     // .domain([d3.min(poverty) - d3.min(obesity)/10 , d3.max(poverty)])
    //     // .domain(0,100)
    //     .range([0, chartWidth])
    //     .padding(1);

    // scale x to chart width
    var xScale = d3.scaleLinear()
        .domain(poverty)
        // .domain([d3.min(poverty), d3.max(poverty)])
        // .domain(0,100)
        .range([ chartWidth, 0])


    // scale y to chart height
    var yScale = d3.scaleLinear()
        .domain([d3.min(obesity) - d3.min(obesity)/10 , d3.max(obesity)])
        .range([chartHeight, 0]);

    // create axes
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale);

    // set x to the bottom of the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis
        .ticks(10));

    

    // set y to the y axis
    // This syntax allows us to call the axis function
    // and pass in the selector without breaking the chaining
    chartGroup.append("g")
    .call(yAxis);


    // Append bubble to chartGroup
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

    // Append text to chartGroup
    chartGroup.selectAll(".state")
    .data(obesity)
    .enter()
    .append("text")
    .classed("state", true)
    .attr("x", (d, i) => xScale(poverty[i]) - cRad/2 )
    .attr("y", d => yScale(d) + cRad / 4 )
    .text( (d,i) => state[i] )
    .attr("font-size", 8)
    .attr("fill","white")


  }).catch(function(error) {
    console.log(error);
  });
  