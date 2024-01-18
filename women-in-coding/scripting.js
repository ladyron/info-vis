window.onload = (event) => {
    console.log("page is fully loaded");
     // Define the data source
    var data = [4, 8, 15, 16, 23, 42];
        
    // Define the chart dimensions
    var width = 400;
    var height = 200;
    
    // Create the chart
    var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);


    // Define the scale for the x-axis
    var x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function(d, i) { return i; }));


    // Define the scale for the y-axis
    var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data)]);

        // Add the x-axis labe
        svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .text("Label for X Axis");
    
    
        // Add the y-axis label
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 0 - height / 2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text("Label for Y Axis");


    // Add the bars to the chart
    svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i)
    { return x(i); })
    .attr("y", function(d) { return y(d); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d); });



  };
