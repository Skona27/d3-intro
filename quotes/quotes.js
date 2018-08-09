var quotes = [
  {
    quote: "I see dead people.",
    movie: "The Sixth Sense",
    year: 1999,
    rating: "PG-13"
  }, {
    quote: "May the force be with you.",
    movie: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    rating: "PG"
  }, {
    quote: "You've got to ask yourself one question: 'Do I feel lucky?' Well, do ya, punk?",
    movie: "Dirty Harry",
    year: 1971,
    rating: "R"
  }, {
    quote: "You had me at 'hello.'",
    movie: "Jerry Maguire",
    year: 1996,
    rating: "R"
  }, {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }
];

d3.select("#quotes")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
    .text(data => `${data.quote} - ${data.movie} - ${data.year}`)
    .style("margin", "15px")
    .style("padding", "10px")
    .style("font-size", "1.5em")

// we can still select it later!
// data is still there!

let removeBtn = d3.select("#remove");

removeBtn.on("click", () => {
  // filter movies array
  let nonRQuotes = quotes.filter(movie => movie.rating !== 'R');

  // select all li
  d3.selectAll("li")
    // bind data of nonRmovies, join by qoute
    .data(nonRQuotes, data => data.quote)
    // add the rest to exit prop
    .exit()
    // remove
    .remove()

  removeBtn.remove();
});

let newQuotes = [
  {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }, {
    quote: "Just keep swimming. Just keep swimming. Swimming, swimming, swiming.",
    movie: "Finding Nemo",
    year: 2003,
    rating: "G"
  }
];

let addBtn = d3.select("#add");

addBtn.on("click", () => {
  quotes = quotes.concat(newQuotes);

  // selects all existing and none existing li's and bind them with data
  // update selection
  let listItems = d3.select("#quotes")
    .selectAll("li")
    .data(quotes);

  // enter list items and add new items
  // enter selection
  listItems
    .enter()
    .append("li")
      .text(data => `${data.quote} - ${data.movie} - ${data.year}`)
      .style("margin", "15px")
      .style("padding", "10px")
      .style("font-size", "1.5em")
    // merge both selection in order to style them together
    .merge(listItems)
      .style("color", "red");

  addBtn.remove();
});