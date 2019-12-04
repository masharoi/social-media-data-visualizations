d3.csv("./data/motivations-by-gender.csv").then(function(data) {
  console.log(data);
  const femaleColor = "#8158fc";
  const maleColor = "#ffc15e";
  /* DEFINE DIMENSIONS AND GENERATE SVG */
  var width = document.querySelector("#online-dating-charts").clientWidth;
  var height = document.querySelector("#online-dating-charts").clientHeight;
  var margin = { top: 30, left: 230, right: 50, bottom: 20 };

  var genders = d3.keys(data[0]).filter(function(key) {
    return key !== "motivation";
  });

  var onlineDatingSvg = d3
    .select("#online-dating-charts")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  /* CREATE SCALES  */

  var motivations = data.map(function(d) {
    return d.motivation;
  });
  var yScale = d3
    .scaleBand()
    .domain(motivations)
    .rangeRound([height - margin.bottom, margin.top])
    .padding(0.5);

  var xScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

  /* CREATE AXES */
  var xAxis = onlineDatingSvg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom()
        .scale(xScale)
        .tickFormat(d => d + "%")
    );

  var yAxis = onlineDatingSvg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale));

  /* DRAW BARS FOR BAR CHART */
  var barsGroup = onlineDatingSvg
    .selectAll(".dating-bars")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "dating-bars");

  var maleBars = barsGroup
    .append("rect")
    .attr("x", function(d) {
      return xScale(0) + 1;
    })
    .attr("y", function(d) {
      return yScale(d.motivation);
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return xScale(d.male) - xScale(0);
    })
    .attr("fill", maleColor);

  var femaleBars = barsGroup
    .append("rect")
    .attr("x", function(d) {
      return xScale(0) + 1;
    })
    .attr("y", function(d) {
      return yScale(d.motivation);
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return xScale(d.female) - xScale(0);
    })
    .attr("fill", femaleColor)
    .attr("transform", "translate(0,10)");

  /* ADD LABELS */
  onlineDatingSvg
    .selectAll(".dating-gender-color")
    .data(genders)
    .enter()
    .append("rect")
    .attr("class", "dating-gender-color")
    .attr("x", function(d) {
      return width - margin.right;
    })
    .attr("y", function(d) {
      return d === "female" ? margin.top : margin.top + 15;
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return 30;
    })
    .attr("fill", function(d) {
      return d === "female" ? femaleColor : maleColor;
    });

  var genderLabels = onlineDatingSvg
    .selectAll(".dating-gender-label")
    .data(genders)
    .enter()
    .append("text")
    .attr("class", "dating-gender-label")
    .attr("x", function(d) {
      return width - margin.right - 55;
    })
    .attr("y", function(d) {
      return d === "female" ? margin.top +10 : margin.top + 25;
    })
    .text( function(d) {
      return d === "female" ? "Female" : "Male";
    });
});
