// Load all data
d3.csv("assets/data/data.csv").then(function(data) {

    // console.log(data);

    // log a list of names
    var poverty = data.map(d => parseInt(d.poverty));
    // var poverty = data.map(d => d.poverty);
 
    // console.log("poverty", poverty);

    var obesity = data.map(d =>parseInt( d.obesity));

    // console.log("obesity", obesity);


    var state = data.map(d => d.abbr);
    console.log("obesity", state);

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
    // var xScale = d3.scaleBand()
    //     .domain(poverty)
    //     // .domain([d3.min(poverty) - d3.min(obesity)/10 , d3.max(poverty)])
    //     // .domain(0,100)
    //     .range([0, chartWidth])
    //     .padding(1);

    console.log(d3.min(poverty))

    // scale x to chart width
    var xScale = d3.scaleLinear()

        .domain([d3.min(poverty) - d3.min(poverty)/10, d3.max(poverty)])

        .range([0, chartWidth ])


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
    .call(xAxis);

    

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

    // Append text to bubbles
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

    // Append text to X axis
    svg.append("text")             
    .attr("transform",
          "translate(" + (chartWidth/2 + margin.left) + " ," + 
                         (chartHeight + margin.top + 40) + ")")
    .style("text-anchor", "middle")
    .text("Poverty")
    .attr("font-size", 20); 

      // text label for the y axis
    svg.append("text")
    .attr("transform", "translate(0," + (chartHeight / 2) + ") rotate(-90)")

    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Obesity")
    .attr("font-size", 20); 


  }).catch(function(error) {
    console.log(error);
  });
  