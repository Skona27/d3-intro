// load data
let data = [4, 8, 15, 23, 42];

// set width and height of svg
const   width = 960,
        height = 500;

// scale data linearly
const scale = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0])

// domain sets the min and the max value from the data
// and range specifies the min and max value at chart

// select chart (svg) and set it's attributes
const chart = d3.select(".chart")
  .attr("width", width)
  .attr("height", height)

// calculate bar width based on numb of data
let barWidth = width / data.length;

// draw bars, bind the data with data function
const bar = chart.selectAll("g")
  .data(data)
  .enter()
  .append("g")
    .attr("transform", (data, ind) => `translate(${ind * barWidth}, 0)`);
// move bars by its width

bar.append("rect")
  // set width and height based on data
  .attr("height", data => height - scale(data))
  .attr("width", barWidth - 1)
  .attr("y", data => scale(data));
// set starting points of bar's left top corner

bar.append("text")
  // left corner in middle of bar
  .attr("x", barWidth / 2)
  // left corner 6px from top of bar
  .attr("y", data => scale(data) + 6)
  .attr("dy", ".75em")
  .attr("dx", ".25em")
  .text(data => data);
// center text with dy dx