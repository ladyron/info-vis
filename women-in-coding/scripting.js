window.onload = function() {
    function createChart() {
        d3.csv("women-in-stem-1993-2009.csv").then(function(dataset) {
            // Parse the dataset
            dataset.forEach(function(d) {
                d.year = +d.year; // Convert string to number
                d.computer_math_scientists = +d.computer_math_scientists;
                d.bio_agri_environ_scientists = +d.bio_agri_environ_scientists;
                d.physical_scientists = +d.physical_scientists;
                d.social_scientists = +d.social_scientists;
                d.engineers = +d.engineers;
            });

            // Remove existing SVG
            d3.select("#chart").selectAll("svg").remove();
            
            // Set up the SVG
            var containerWidth = document.getElementById("chart").offsetWidth;
            var svgWidth = containerWidth;
            var svgHeight = 500;
            var margin = { top: 20, right: 20, bottom: 42, left: 50 };
            var width = svgWidth - margin.left - margin.right;
            var height = svgHeight - margin.top - margin.bottom;
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

            // ADD YEAR LABEL
            svg.append("text")
                .attr("class", "x-axis-label")
                .attr("x", width / 2)
                .attr("y", height + margin.top + 20) // Adjust the y position as needed
                .style("text-anchor", "middle")
                .text("Year");

            // Create the y-axis
            var yAxis = d3.axisLeft(yScale);
            // var yAxis = d3.axisLeft(yScale).tickSize(-width, 0, 0);

            // Append y-axis to SVG
            var yAxisGroup = svg.append("g")
                                .attr("class", "y-axis")
                                .call(yAxis);

            svg.append("text")
               .attr("transform", "rotate(-90)")
               .attr("y", 0 - margin.left)
               .attr("x", 0 - (height / 2))
               .attr("dy", "1em")
               .style("text-anchor", "middle")
               .text("Percent");


            yAxisGroup.selectAll('.tick').selectAll('line').remove();

            // Update font size of x-axis text based on container width
            var fontSize = Math.min(14, Math.max(8, containerWidth / 60));
            xAxisGroup.selectAll("text")
                .style("font-size", fontSize + "px");
            yAxisGroup.selectAll("text")
                .style("font-size", fontSize + "px");

            // Add a line for computer and math scientists
            var cmline = d3.line()
                         .x(function(d) { return xScale(d.year) + xScale.bandwidth() / 2; })
                         .y(function(d) { return yScale(d.computer_math_scientists); });
                         
            svg.append("path")
                .datum(dataset)
                .attr("fill", "none")
                .attr("class", "line cmhover cmline")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 3)
                .attr("d", cmline);
                
            svg.selectAll(".cm-dot")
                .data(dataset)
                .enter().append("circle")
                .attr("class", "dot cm-dot cmhover cmline")
                .attr("fill", "steelblue")
                .attr("title", function(d) { return +d.computer_math_scientists })
                .attr("stroke-width", 1)
                .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
                .attr("cy", d => yScale(d.computer_math_scientists))
                .attr("r", 4);

            // Add a line for biology, agricultural, and environmental life scientists
            var baeline = d3.line()
                            .x(function(d) { return xScale(d.year) + xScale.bandwidth() / 2; })
                            .y(function(d) { return yScale(d.bio_agri_environ_scientists); })

            svg.append("path")
               .datum(dataset)
               .attr("fill", "none")
               .attr("class", "line baehover baeline")
               .attr("stroke", "#BB77A7")
               .attr("stroke-width", 3)
               .attr("d", baeline);

            svg.selectAll(".bae-dot")
               .data(dataset)
               .enter().append("circle")
               .attr("class", "dot bae-dot baehover baeline")
               .attr("title", function(d) { return +d.bio_agri_environ_scientists })
               .attr("fill", "#BB77A7")
               .attr("stroke-width", 1)
               .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
               .attr("cy", d => yScale(d.bio_agri_environ_scientists))
               .attr("r", 4);

            // Add a line for physical scientist
            var pline = d3.line()
               .x(function(d) { return xScale(d.year) + xScale.bandwidth() / 2; })
               .y(function(d) { return yScale(d.physical_scientists); })

            svg.append("path")
                .datum(dataset)
                .attr("fill", "none")
                .attr("class", "line phover pline")
                .attr("stroke", "indigo")
                .attr("stroke-width", 3)
                .attr("d", pline);

            svg.selectAll(".p-dot")
                .data(dataset)
                .enter().append("circle")
                .attr("class", "dot p-dot phover pline")
                .attr("title", function(d) { return +d.physical_scientists })
                .attr("fill", "indigo")
                .attr("stroke-width", 1)
                .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
                .attr("cy", d => yScale(d.physical_scientists))
                .attr("r", 4);

            // Add a line for social scientists
            var sline = d3.line()
                          .x(function(d) { return xScale(d.year) + xScale.bandwidth() / 2; })
                          .y(function(d) { return yScale(d.social_scientists); })

            svg.append("path")
               .datum(dataset)
               .attr("fill", "none")
               .attr("class", "line shover sline")
               .attr("stroke", "mediumorchid")
               .attr("stroke-width", 3)
               .attr("d", sline);
            
            svg.selectAll(".s-dot")
               .data(dataset)
               .enter().append("circle")
               .attr("class", "dot s-dot shover sline")
               .attr("title", function(d) { return +d.social_scientists })
               .attr("fill", "mediumorchid")
               .attr("stroke-width", 1)
               .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
               .attr("cy", d => yScale(d.social_scientists))
               .attr("r", 4);

            // Add a line for engineers
            var eline = d3.line()
                          .x(function(d) { return xScale(d.year) + xScale.bandwidth() / 2; })
                          .y(function(d) { return yScale(d.engineers); })

            svg.append("path")
               .datum(dataset)
               .attr("fill", "none")
               .attr("class", "line ehover eline")
               .attr("stroke", "pink")
               .attr("stroke-width", 3)
               .attr("d", eline);

            svg.selectAll(".e-dot")
               .data(dataset)
               .enter().append("circle")
               .attr("class", "dot e-dot ehover eline")
               .attr("title", function(d) { return +d.engineers })
               .attr("fill", "pink")
               .attr("stroke-width", 1)
               .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
               .attr("cy", d => yScale(d.engineers))
               .attr("r", 4);

            $("circle").tooltip({
                'placement': 'left'
            });

            $(".cmhover").mouseover(function() {
                $(".cmline").css("stroke-width", 5);
                $(".cm-dot").css("r", 5);
                $(".cm-dot").css("stroke", "lightblue");
                $('.cm-text').css("background-color","thistle");
            });
            $(".baehover").mouseover(function() {
                $(".baeline").css("stroke-width", 5);
                $(".bae-dot").css("r", 5);
                $(".bae-dot").css("stroke", "palevioletred");
                $('.bae-text').css("background-color","thistle");
            });
            $(".phover").mouseover(function() {
                $(".pline").css("stroke-width", 5);
                $(".p-dot").css("r", 5);
                $(".p-dot").css("stroke", "mediumpurple");
                $('.p-text').css("background-color","thistle");
            });
            $(".shover").mouseover(function() {
                $(".sline").css("stroke-width", 5);
                $(".s-dot").css("r", 5);
                $(".s-dot").css("stroke", "orchid");
                $('.s-text').css("background-color","thistle");
            });
            $(".ehover").mouseover(function() {
                $(".eline").css("stroke-width", 5);
                $(".e-dot").css("r", 5);
                $(".e-dot").css("stroke", "mistyrose");
                $('.e-text').css("background-color","thistle");
            });
            $(".cmhover").mouseout(function() {
                $(".cmline").css("stroke-width", 3);
                $(".cm-dot").css("r", 4);
                $(".cm-dot").css("stroke", "transparent");
                $('.cm-text').css("background-color","transparent");
            });
            $(".baehover").mouseout(function() {
                $(".baeline").css("stroke-width", 3);
                $(".bae-dot").css("r", 4);
                $(".bae-dot").css("stroke", "transparent");
                $('.bae-text').css("background-color","transparent");
            });
            $(".phover").mouseout(function() {
                $(".pline").css("stroke-width", 3);
                $(".p-dot").css("r", 4);
                $(".p-dot").css("stroke", "transparent");
                $('.p-text').css("background-color","transparent");
            });
            $(".shover").mouseout(function() {
                $(".sline").css("stroke-width", 3);
                $(".s-dot").css("r", 4);
                $(".s-dot").css("stroke", "transparent");
                $('.s-text').css("background-color","transparent");
            });
            $(".ehover").mouseout(function() {
                $(".eline").css("stroke-width", 3);
                $(".e-dot").css("r", 4);
                $(".e-dot").css("stroke", "transparent");
                $('.e-text').css("background-color","transparent");
            });
            $(".cm-text").mouseover(function() {
                $(".cmline").addClass("target");
                $(".baeline").addClass("other");
                $(".pline").addClass("other");
                $(".sline").addClass("other");
                $(".eline").addClass("other");
            });
            $(".cm-text").mouseout(function() {
                $(".cmline").removeClass("target");
                $(".baeline").removeClass("other");
                $(".pline").removeClass("other");
                $(".sline").removeClass("other");
                $(".eline").removeClass("other");
            });
            $(".bae-text").mouseover(function() {
                $(".baeline").addClass("target");
                $(".cmline").addClass("other");
                $(".pline").addClass("other");
                $(".sline").addClass("other");
                $(".eline").addClass("other");
            });
            $(".bae-text").mouseout(function() {
                $(".baeline").removeClass("target");
                $(".cmline").removeClass("other");
                $(".pline").removeClass("other");
                $(".sline").removeClass("other");
                $(".eline").removeClass("other");
            });
            $(".p-text").mouseover(function() {
                $(".pline").addClass("target");
                $(".cmline").addClass("other");
                $(".baeline").addClass("other");
                $(".sline").addClass("other");
                $(".eline").addClass("other");
            });
            $(".p-text").mouseout(function() {
                $(".pline").removeClass("target");
                $(".cmline").removeClass("other");
                $(".baeline").removeClass("other");
                $(".sline").removeClass("other");
                $(".eline").removeClass("other");
            });
            $(".s-text").mouseover(function() {
                $(".sline").addClass("target");
                $(".cmline").addClass("other");
                $(".baeline").addClass("other");
                $(".pline").addClass("other");
                $(".eline").addClass("other");
            });
            $(".s-text").mouseout(function() {
                $(".sline").removeClass("target");
                $(".cmline").removeClass("other");
                $(".baeline").removeClass("other");
                $(".pline").removeClass("other");
                $(".eline").removeClass("other");
            });
            $(".e-text").mouseover(function() {
                $(".eline").addClass("target");
                $(".cmline").addClass("other");
                $(".baeline").addClass("other");
                $(".pline").addClass("other");
                $(".sline").addClass("other");
            });
            $(".e-text").mouseout(function() {
                $(".eline").removeClass("target");
                $(".cmline").removeClass("other");
                $(".baeline").removeClass("other");
                $(".pline").removeClass("other");
                $(".sline").removeClass("other");
            });
        }).catch(function(error) {
            console.log("Error loading the field dataset: " + error);
        });

        d3.csv("women-in-cs-1995-2018.csv").then(function(dataset) {
            // Parse the dataset
            dataset.forEach(function(d) {
                d.year = +d.year; // Convert string to number
                d.bachelors = +d.bachelors;
                d.masters = +d.masters;
                d.doctorate = +d.doctorate;
            });

            // Remove existing SVG
            d3.select("#bar-chart").selectAll("svg").remove();
            
            // Set up the SVG
            var containerWidth = document.getElementById("bar-chart").offsetWidth;
            var svgWidth = containerWidth;
            var svgHeight = 500;
            var margin = { top: 20, right: 20, bottom: 42, left: 50 };
            var width = svgWidth - margin.left - margin.right;
            var height = svgHeight - margin.top - margin.bottom;
            var svg = d3.select("#bar-chart")
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
                            .domain([0, d3.max(dataset, function(d) {
                                return d.bachelors + d.masters + d.doctorate;
                            })])
                            .nice()
                            .range([height, 0]);

            // Create color scale for segments
            var color = d3.scaleOrdinal()
                            .domain(["bachelors", "masters", "doctorate"])
                            .range(["#6C464F", "#9E768F", "#9FA4C4"]);

            // Create stacked data
            var stackedData = d3.stack()
                                .keys(["bachelors", "masters", "doctorate"])
                                .order(d3.stackOrderNone)
                                .offset(d3.stackOffsetNone)(dataset);

            // Create and append bars
            svg.selectAll(".bar")
                .data(stackedData)
                .enter().append("g")
                .attr("class", "bar")
                .selectAll("rect")
                .data(function(d) { return d; })
                .enter().append("rect")
                .attr("x", function(d) { return xScale(d.data.year); })
                .attr("y", function(d) { return yScale(d[1]); })
                .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
                .attr("width", xScale.bandwidth())
                .attr("fill", function(d) { return color(d3.select(this.parentNode).datum().key); }) // Assign color based on key
                .attr("data-toggle", "tooltip") // Add Bootstrap tooltip attribute
                .attr("title", function(d) { return d.data[d3.select(this.parentNode).datum().key]; }); // Set tooltip text

            // Create the x-axis
            var xAxis = d3.axisBottom(xScale);

            // Append x-axis to SVG
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            // Create the y-axis
            var yAxis = d3.axisLeft(yScale);

            // Append y-axis to SVG
            svg.append("g")
                .attr("class", "y-axis")
                .call(yAxis);

            $('[data-toggle="tooltip"]').tooltip();

        }).catch(function(error) {
            console.log("Error loading the dataset: " + error);
        });
       
    }
    // Call createChart initially and on window resize
    createChart();
    window.addEventListener("resize", createChart);
};