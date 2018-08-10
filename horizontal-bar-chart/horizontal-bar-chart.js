// load data
let data = [4, 8, 15, 16, 23, 24, 42];

// set width and height of bar
const   width = 600,
        barHeight = 20;

// scale data linearly
const scale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width])

// domain sets the min and the max value from the data
// and range specifies the min and max value at chart

// select chart (svg) and set it's attributes
const chart = d3.select(".chart")
  .attr("width", width)
  .attr("height", barHeight * data.length)

// svg height will be proportional to data count

// draw bars, bind the data with data function
const bar = chart.selectAll("g")
  .data(data)
  .enter()
  .append("g")
    .attr("transform", (data, ind) => `translate(0, ${ind * barHeight})`);

bar.append("rect")
  .attr("width", scale)
  .attr("height", barHeight - 1);

bar.append("text")
  .attr("x", data => scale(data) - 3)
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .text(data => data);