var lineData = [
  {x: 5, y: 5},
  {x: 20, y: 20},
  {x: 40, y: 30},
  {x: 60, y: 40},
  {x: 80, y: 60},
  {x: 99, y: 99},
  {x: 140, y: 110},
  {x: 160, y: 120},
  {x: 180, y: 130},
  {x: 200, y: 160}
];

const width = 700;
const height = 700;
const padding = 40;

var xScale = d3.scaleLinear()
  .domain(d3.extent(lineData, data => data.x ))
  .range([padding, width - padding]);

var yScale = d3.scaleLinear()
  .domain(d3.extent(lineData, data => data.y ))
  .rangeRound([height - padding, padding]);

var line = d3.line()
   .x(data => xScale(data.x))
   .y(data => yScale(data.y));

d3.select("svg")
  .attr("width", width)
  .attr("height", height)
  .append("path")
    .datum(lineData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 2.5)
    .attr("d", line);


// axis
const xAxis = d3.axisBottom(xScale)
  .tickSize(-height + 2*padding)
  .tickSizeOuter(0)
  
const yAxis = d3.axisLeft(yScale)
  .tickSize(-width + 2*padding)
  .tickSizeOuter(0)


d3.select("svg")
  .append("g")
    .attr("transform", `translate(0, ${height-padding})`)
    .call(xAxis);

d3.select("svg")
  .append("g")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);


// labels
d3.select("svg")
.append("text")
  .attr("x", width / 2)
  .attr("y", height - padding)
  .attr("dy", "2em")
  .style("text-anchor", "middle")
  .text("X Label");

d3.select("svg")
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", padding)
  .attr("dy", "-1.3em")
  .style("text-anchor", "middle")
  .text("Y Label");


// add dots
d3.select("svg")
  .selectAll("circle")
    .data(lineData)
    .enter()
  .append("circle")
    .attr("r", 4)
    .attr("cx", data => xScale(data.x))
    .attr("cy", data => yScale(data.y))
    .attr("fill", "steelblue")
    .on("mousemove", (data) => {
      tooltip
        .style("opacity", 1)
        .style("left", `${d3.event.x}px`)
        .style("top", `${d3.event.y}px`)
        .html(`
        <p>X: ${data.x}</p>
        <p>Y: ${data.y}</p>
        `)
    }).on("mouseout", () => {
      tooltip
        .style("opacity", 0)
    })

// tooltip
let tooltip = d3.select("body")
  .append("div")
    .classed("tooltip", true);