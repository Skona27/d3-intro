// get the min and max year values
let minYear = birthData[0].year;
let maxYear = birthData[birthData.length-1].year;

// change input value and input range
d3.select("input")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear);

// assign properties
let width = 1000;
let height = 700;
let barNum = 12;
let padding = 5;

// calculate bar width
let barWidth = width / barNum - padding;

// update year info in heading
d3.select("#year").text(`${minYear}`);

// update bars, first set props on svg
d3.select("svg")
  .attr("width", width)
  .attr("height", height)
// get all non existing rects
.selectAll("rect")
// bind data where year is min year
.data(birthData.filter(data => data.year === minYear))
.enter()
// fore every bar set properties
.append("rect")
  .attr("width", barWidth)
  // set normalized height
  .attr("height", data => data.births / 2.5e6 * height)
  // set starting y point (in order to keep white space)
  .attr("y", data => height - data.births / 2.5e6 * height)
  // set starting x point in order to show bars one after another
  .attr("x", (data, ind) => (barWidth + padding) * ind)
  .attr("fill", "yellowgreen")


// event listener
d3.select("input").on("input", () => {
  // get current year, change value to int
  let year = +d3.event.target.value;

  // update year info in heading
  d3.select("#year").text(`${year}`);

  // for each rectangle set normalized height and y starting point
  d3.selectAll("rect")
    .data(birthData.filter(data => data.year == year))
    .attr("height", data => data.births / 2.5e6 * height)
    .attr("y", data => height - data.births / 2.5e6 * height);
});