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
            var margin = { top: 20, right: 20, bottom: 30, left: 50 };
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
                            .domain([0, 80]) // Adjust the domain based on your data
                            .range([height, 0]);
            
            // Create the x-axis
            var xAxis = d3.axisBottom(xScale);

            // Append x-axis to SVG
            var xAxisGroup = svg.append("g")
                                .attr("class", "x-axis")
                                .attr("transform", "translate(0," + height + ")")
                                .call(xAxis);

            // ADD YEAR LABEL

            // Create the y-axis
            var yAxis = d3.axisLeft(yScale);

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
                // $(".cm-dot").css("stroke", "red");
            });
            $(".baehover").mouseover(function() {
                $(".baeline").css("stroke-width", 5);
                $(".bae-dot").css("r", 5);
            });
            $(".phover").mouseover(function() {
                $(".pline").css("stroke-width", 5);
                $(".p-dot").css("r", 5);
            });
            $(".shover").mouseover(function() {
                $(".sline").css("stroke-width", 5);
                $(".s-dot").css("r", 5);
            });
            $(".ehover").mouseover(function() {
                $(".eline").css("stroke-width", 5);
                $(".e-dot").css("r", 5);
            });
            $(".cmhover").mouseout(function() {
                $(".cmline").css("stroke-width", 3);
                $(".cm-dot").css("r", 4);
                // $(".cm-dot").css("stroke", "transparent");
            });
            $(".baehover").mouseout(function() {
                $(".baeline").css("stroke-width", 3);
                $(".bae-dot").css("r", 4);
            });
            $(".phover").mouseout(function() {
                $(".pline").css("stroke-width", 3);
                $(".p-dot").css("r", 4);
            });
            $(".shover").mouseout(function() {
                $(".sline").css("stroke-width", 3);
                $(".s-dot").css("r", 4);
            });
            $(".ehover").mouseout(function() {
                $(".eline").css("stroke-width", 3);
                $(".e-dot").css("r", 4);
            });
            $(".cm-text").mouseover(function() {
                $(".cmline").addClass("test");
                $(".baeline").addClass("test2");
                $(".pline").addClass("test2");
                $(".sline").addClass("test2");
                $(".eline").addClass("test2");
            });
            $(".cm-text").mouseout(function() {
                $(".cmline").removeClass("test");
                $(".baeline").removeClass("test2");
                $(".pline").removeClass("test2");
                $(".sline").removeClass("test2");
                $(".eline").removeClass("test2");
            });
            $(".bae-text").mouseover(function() {
                $(".baeline").addClass("test");
                $(".cmline").addClass("test2");
                $(".pline").addClass("test2");
                $(".sline").addClass("test2");
                $(".eline").addClass("test2");
            });
            $(".bae-text").mouseout(function() {
                $(".baeline").removeClass("test");
                $(".cmline").removeClass("test2");
                $(".pline").removeClass("test2");
                $(".sline").removeClass("test2");
                $(".eline").removeClass("test2");
            });
            $(".p-text").mouseover(function() {
                $(".pline").addClass("test");
                $(".cmline").addClass("test2");
                $(".baeline").addClass("test2");
                $(".sline").addClass("test2");
                $(".eline").addClass("test2");
            });
            $(".p-text").mouseout(function() {
                $(".pline").removeClass("test");
                $(".cmline").removeClass("test2");
                $(".baeline").removeClass("test2");
                $(".sline").removeClass("test2");
                $(".eline").removeClass("test2");
            });
            $(".s-text").mouseover(function() {
                $(".sline").addClass("test");
                $(".cmline").addClass("test2");
                $(".baeline").addClass("test2");
                $(".pline").addClass("test2");
                $(".eline").addClass("test2");
            });
            $(".s-text").mouseout(function() {
                $(".sline").removeClass("test");
                $(".cmline").removeClass("test2");
                $(".baeline").removeClass("test2");
                $(".pline").removeClass("test2");
                $(".eline").removeClass("test2");
            });
            $(".e-text").mouseover(function() {
                $(".eline").addClass("test");
                $(".cmline").addClass("test2");
                $(".baeline").addClass("test2");
                $(".pline").addClass("test2");
                $(".sline").addClass("test2");
            });
            $(".e-text").mouseout(function() {
                $(".eline").removeClass("test");
                $(".cmline").removeClass("test2");
                $(".baeline").removeClass("test2");
                $(".pline").removeClass("test2");
                $(".sline").removeClass("test2");
            });

        }).catch(function(error) {
            console.log("Error loading the field dataset: " + error);
        });

        d3.csv("women-demographics.csv").then(function(dataset) {
            // Parse the dataset
            dataset.forEach(function(d) {

            });
            
        }).catch(function(error) {
            console.log("Error loading demographic dataset: " + error)
        })
    }
    // Call createChart initially and on window resize
    createChart();
    window.addEventListener("resize", createChart);
};