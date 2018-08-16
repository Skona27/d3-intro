const width = 500;
const height = 500;
const padding = 40;

const yMax = d3.max(birthData2011, data => data.lifeExpectancy);
const yMin = d3.min(birthData2011, data => data.lifeExpectancy);

let yScale = d3.scaleLinear()
  .domain([yMin, yMax])
  .range([height - padding, padding]);

let xScale = d3.scaleLinear()
  .domain(d3.extent(birthData2011, data => data.births / data.population))
  .range([padding, width - padding]);

let colorScale = d3.scaleLinear()
  .domain(d3.extent(birthData2011, data => data.population / data.area))
  .range(["lightgreen", "red"]);

let radiusScale = d3.scaleLinear()
  .domain(d3.extent(birthData2011, data => data.births))
  .range([4, 30]);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("circle")
  .data(birthData2011)
  .enter()
  .append("circle")
    .attr("cx", data => xScale(data.births / data.population))
    .attr("cy", data => yScale(data.lifeExpectancy))
    .attr("r", data => radiusScale(data.births))
    .attr("fill", data => colorScale(data.population / data.area))
    .on("mousemove", (data) => {
      tooltip
        .style("opacity", 1)
        .style("left", `${d3.event.x}px`)
        .style("top", `${d3.event.y}px`)
        .html(`
          <p>Region: ${data.region}</p>
          <p>Births: ${data.births}</p>
          <p>Population: ${data.population}</p>
          <p>Area: ${data.area}</p>
          <p>Life Expectancy: ${data.lifeExpectancy}</p>
        `)
    }).on("mouseout", () => {
      tooltip
        .style("opacity", 0)
    })

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
    .text("Births per Capita");


d3.select("svg")
  .append("text")
    .attr("x", width / 2)
    .attr("y", padding)
    .attr("dy", "-.5em")
    .style("text-anchor", "middle")
    .style("font-size", "1.5em")
    .text("Data on Births in 2011");

d3.select("svg")
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", padding)
    .attr("dy", "-1.3em")
    .style("text-anchor", "middle")
    .text("Life Expectancy");
  
// tooltip
let tooltip = d3.select("body")
  .append("div")
    .classed("tooltip", true);