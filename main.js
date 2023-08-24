// dataset
d3.csv("mass-shootings.csv").then(function(dataset) {
    // if (error) {
    //     // console.log("Error");
    //     // console.log(error);
    //     throw error;
    // } else {
    //     console.log("I work");
    // }
    var stateLocations = [];
    for (i = 0; i < dataset.length; i++) {
        if (!(stateLocations.includes(dataset[i]["State"]))) {
            stateLocations.push(dataset[i]["State"]);
        }
    }
    stateLocations.sort();

    var body = d3.select("body").attr("class", "main");

    // Scatterplot
    var circle = d3.select("svg").selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("r", 2.5)
        .attr("cx", function(d) { return scaleDate(new Date(d['date']));})
        .attr("cy", function(d) { return scaleFatalities(d['fatalities']);});

    // x-axis
    var svg = d3.select("#scatterplot").selectAll("svg");
    svg.append("g").attr("class", "x axis")
        .attr("transform", "translate(10, 550)")
        .call(d3.axisBottom(dateScale).ticks(d3.timeYear.every(4)));
        
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "translate(330, 590)")
        .text("Year");

    // y-axis
    svg.append("g").attr("class", "y axis")
        .attr("transform", "translate(50, 0)")
        .call(d3.axisLeft(fatalityScale));
        
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "translate(20, 330) rotate(-90)")
        .text("Fatalities");

    // Title
    svg.append("text")
        .attr("class", "title")
        .attr("transform", "translate(140, 30)")
        .attr("font-weight", "bold")
        .text("Fatalities from mass shootings in the U.S. from 1982 to 2022");
    selector = document.getElementById('stateSelect');
        for (var i = 0; i < stateLocations.length; i++) {
            selector.options.add(new Option(stateLocations[i], stateLocations[i]));
        }

    // Pie chart
    // Pie Chart Variables
        var white = 0;
        var black = 0;
        var latino = 0;
        var asian = 0;
        var native = 0;
        var other = 0;

        var whiteArr = [];
        var blackArr = [];
        var latinoArr = [];
        var asianArr = [];
        var nativeArr = [];
        var otherArr = [];
        for (i = 0; i < dataset.length; i++) {
            if (dataset[i]["race"] == "White" || dataset[i]["race"] == "white") {
                whiteArr.push(dataset[i]["race"]);
            } else if (dataset[i]["race"] == "Black"|| dataset[i]["race"] == "black") {
                blackArr.push(dataset[i]["race"]);
            } else if (dataset[i]["race"] == "Latino") {
                latinoArr.push(dataset[i]["race"]);
            } else if (dataset[i]["race"] == "Asian") {
                asianArr.push(dataset[i]["race"]);
            } else if (dataset[i]["race"] == "Native American") {
                nativeArr.push(dataset[i]["race"]);
            } else {
                otherArr.push(dataset[i]["race"]);
            }
        }
    var raceData = [whiteArr.length, blackArr.length, otherArr.length, latinoArr.length, asianArr.length, nativeArr.length];

	var svg2 = d3.select("#pie-chart").select("svg"),
		radius = Math.min(500, 400) / 2,
		g = svg2.append("g").attr("transform", "translate(250, 300)");

    svg2.append("text")
        .attr("class", "title")
        .attr("transform", "translate(200, 30)")
        .attr("font-weight", "bold")
        .text("Race of shooters");

    svg2.append("text")
        .attr("class", "legend")
        .attr("transform", "translate(550, 150)")
        .text("Legend");
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "translate(550, 180)")
        .attr("font-weight", "bold")
        .attr("fill", "#846B8A")
        .text("White: " + whiteArr.length);
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "translate(550, 200)")
        .attr("font-weight", "bold")
        .attr("fill", "#BB77A7")
        .text("Black: " + blackArr.length);
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "translate(550, 220)")
        .attr("font-weight", "bold")
        .attr("fill", "#C98BB9")
        .text("Other: " + otherArr.length);
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "translate(550, 240)")
        .attr("font-weight", "bold")
        .attr("fill", "#F0A5D3")
        .text("Latino:" + latinoArr.length);
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "translate(550, 260)")
        .attr("font-weight", "bold")
        .attr("fill", "#C7BEB8")
        .text("Asian:" + asianArr.length);
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "translate(550, 280)")
        .attr("font-weight", "bold")
        .attr("fill", "#BFBFBF")
        .text("Native American:" + nativeArr.length);


	var color = d3.scaleOrdinal(['#846B8A', '#BB77A7','#C98BB9','#F0A5D3','#FAE3E3', '#FEF5EF', 'FFFFFF']);

	// Generate the pie
	var pie = d3.pie();

	// Generate the arcs
	var arc = d3.arc()
		.innerRadius(0)
		.outerRadius(radius);

	//Generate groups
	var arcs = g.selectAll("arc")
		.data(pie(raceData))
		.enter()
		.append("g")
		.attr("class", "arc");

	//Draw arc paths
	arcs.append("path")
		.attr("fill", function(d, i) {
			return color(i);
		})
		.attr("d", arc); 

    let yesCount = 0;
    let noCount = 0;
    let idkCount = 0;
    for (i = 0; i < dataset.length; i++) {
        if (dataset[i]["mental_health"] == "yes" || dataset[i]["mental_health"] == "Yes") {
            yesCount++;
        } else if (dataset[i]["mental_health"] == "no" || dataset[i]["mental_health"] == "No") {
            noCount++;
        } else {
            idkCount++;
        }
    }  
    var barData = ["Yes", "No", "Unknown"];
    var barData = [{
        name: "Yes",
        value: yesCount
    }, {
        name: "No",
        value: noCount
    }, {
        name: "Unknown",
        value: idkCount
    }];
    
    var width = 400,
        height = 200;
    
    var svgP = d3.selectAll(".bar-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    var xScale = d3.scalePoint()
        .domain(barData.map(function(d) {
            return d.name
        }))
        .range([70, width - 50])
    
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(barData, function(d) {
            return d.value
        }) * 1.1])
        .range([150, 10]);
    
    var line = d3.line()
        .x(function(d){ return xScale(d.name)})
        .y(function(d){ return yScale(d.value)});
        
    // svg2.append(svgP);
    svgP.append("path")
        .attr("d", line(barData))
        .attr("stroke", "#BB77A7")
        .attr("stroke-width", "2")
        .attr("fill", "none");
    
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    svgP.append("g").attr("transform", "translate(0,150)")
        .attr("class", "xAxis")
        .call(xAxis);
    
    svgP.append("g")
        .attr("transform", "translate(50,0)")
        .attr("class", "yAxis")
        .call(yAxis);
    svgP.append("text")
        .attr("class", "x")
        .attr("transform", "translate(120, 200)")
        .text("Prior Issues of Mental Health");
    svgP.append("text")
        .attr("class", "y")
        .attr("transform", "translate(10, 150) rotate(-90)")
        .text("Number of shooters");

    
});

// Handle scaled values



function scaleDate(date) {
    return dateScale(date);
}

function scaleFatalities(fatalities) {
    return fatalityScale(fatalities);
}

// Create axes and labels

var dateScale = d3.scaleTime()
    .domain([new Date(1982, 0, 1), new Date(2022, 0, 1)]).range([70, 620]);

var fatalityScale = d3.scaleLinear()
    .domain([0, 35]).range([540, 50]);


function updateGraphs() {
    var e = document.getElementById("stateSelect");
    var stateName = e.options[e.selectedIndex].text;
    d3.csv("mass-shootings.csv").then(function(data) {
        var initialData = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i]["State"] == stateName) {
                initialData.push(data[i]);
                console.log(initialData.length);
                break;
            }
        }
        // var circle = d3.select("svg").selectAll("circle")
        // // .data(initialData)
        // // .enter()
        // .append("circle")
        // .attr("r", 2.5)
        // .attr("cx", 100)
        // .attr("cy", 100);
    });
}
