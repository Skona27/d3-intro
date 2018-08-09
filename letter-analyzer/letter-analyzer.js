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

  // UPDATE SELECTION
  // select all letter div (at first, none exists)
  let letters = d3.select("#letters").selectAll(".letter")
    // bind char count to letter divs
    .data(getFrequencies(text), data => data.character);

    // REMOVE SELECTION
  letters
    .classed("new", false)
    .exit()
    .remove();

  // ENTER SELECTION
  letters
    // move divs to enter property
    .enter()
    // append divs
    .append("div")
      // adjust height based on count
      .classed("letter new", true)
    // MERGE SELECTION
    .merge(letters)
      .style("height", data => `${data.count * 50}px`)
      .text(data => data.character);

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