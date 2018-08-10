// define properties
let width = 800;
let height = 400;
let barPadding = 10;

// select svg element, set it's attr
let svg = d3.selectAll("svg")
  .attr("width", width)
  .style("height", height);

function getFrequencies(string) {
  // remove spaces
  string = string.split(" ").join("");
  // split and sort into arr of chars
  let arr = string.split("").sort();
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    // get previous char
    let last = result[result.length - 1];

    // if previous doesn't exist, or is the same as current, increment
    if (last && last.character === arr[i]) last.count++;
    // else push char as new obj
    else result.push({character: arr[i], count: 1});
  }
  return result
} 

// listen on form submit
d3.select("form").on("submit", () => {
  // prevent form from submitting
  d3.event.preventDefault();

  // select input text
  let input = d3.select("input");
  let text = input.property("value").toLowerCase();

  // analyze text
  let data = getFrequencies(text);
  // calculate bar width
  let barWidth = width / data.length - barPadding;

  // UPDATE SELECTION
  // select all letter rect (at first, none exists)
  let letters = svg.selectAll(".letter")
    // bind char count to letter rects
    .data(data, data => data.character);

    // REMOVE SELECTION
  letters
    .classed("new", false)
    .exit()
    .remove();

  // ENTER SELECTION
  letters
    // move rects to enter property
    .enter()
    // append rect
    .append("rect")
      .classed("letter new", true)
    // MERGE SELECTION
    .merge(letters)
      // set bar width and height
      .style("width", barWidth)
      // height is based on letter count
      .style("height", data => `${data.count * 100}`)
      // set starting y point (in order to keep white space from top)
      .attr("y", data => height - data.count * 100)
      // set starting x point in order to show bars one after another
      .attr("x", (data, ind) => (barWidth + barPadding) * ind)

    // show text
    d3.select("#phrase")
      .text(`Analysis of: ${text}`);

    d3.select("#count")
      .text(`(New characters: ${letters.enter().nodes().length})`)

    // clear input
    input.property("value", "");
});

// reset btn
d3.select("#reset").on("click", () => {
  d3.selectAll(".letter")
    .remove();

  d3.select("#phrase")
    .text("");

  d3.select("#count")
    .text("");
})