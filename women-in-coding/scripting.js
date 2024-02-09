window.onload = function() {
    function createChart() {
        d3.csv("women-in-stem-1993-2009.csv").then(function(dataset) {
            // Parse the dataset
            dataset.forEach(function(d) {
                d.year = +d.year; // Convert string to number
                // You can parse other columns if needed
            });

            // Remove existing SVG
            d3.select("#chart").selectAll("svg").remove()
            
            // Set up the SVG
            var containerWidth = document.getElementById("chart").offsetWidth;
            var svgWidth = containerWidth;
            var svgHeight = 500
            var margin = { top: 20, right: 20, bottom: 30, left: 50 };
            var width = svgWidth - margin.left - margin.right;
            var height = svgHeight - margin.top - margin.bottom
            var svg = d3.select("#chart")
                        .append("svg")
                        .attr("width", svgWidth)
                        .attr("height", svgHeight)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
            // Set up scales
            var xScale = d3.scaleBand()
                           .domain(dataset.map(function(d) { return d.year; }))
                           .range([0, width])
                           .padding(0.1);
            var yScale = d3.scaleLinear()
                           .domain([0, 80])
                           .range([height, 0]);

            
            // Create the x-axis
            var xAxis = d3.axisBottom(xScale);

            // Append x-axis to SVG
            var xAxisGroup = svg.append("g")
                            .attr("class", "x-axis")
                            .attr("transform", "translate(0," + height + ")")
                            .call(xAxis);

            // Create the y-axis
            var yAxis = d3.axisLeft(yScale);

            // Append y-axis to SVG
            var yAxisGroup = svg.append("g")
               .attr("class", "y-axis")
               .call(yAxis)

            svg.append("text")
               .attr("transform", "rotate(-90)")
               .attr("y", 0 - margin.left)
               .attr("x", 0 - (height / 2))
               .attr("dy", "1em")
               .style("text-anchor", "middle")
               .text("Percent");

            d3.select('#chart').selectAll('.tick').selectAll('line').remove();

            // Update font size of x-axis text based on container width
            var fontSize = Math.min(14, Math.max(8, containerWidth / 60));
            xAxisGroup.selectAll("text")
                .style("font-size", fontSize + "px");
            yAxisGroup.selectAll("text")
                .style("font-size", fontSize + "px");
            

        }).catch(function(error) {
            console.log("Error loading the dataset: " + error);
        });
    }

    // Call createChart initially and on window resize
    createChart();
    window.addEventListener("resize", createChart);
};