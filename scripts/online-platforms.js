/* DEFINE DIMENSIONS AND GENERATE SVG */
var platformsWidth = getWidth("#online-platforms-charts");
var platformsHeight = getHeight("#online-platforms-charts");
var platformsSvg = getInitialsvg(
  "#online-platforms-charts",
  platformsWidth,
  platformsHeight
);

d3.csv("./data/platforms-by-audience.csv").then(function(data) {
  /* CREATE SCALES  */
  var sortedData = data.sort(
    (platform0, platform1) =>  + platform1.size - platform0.size
  );

  var platforms = sortedData.map(function(d) {
    return d.platform;
  });

  const maxAudienceSize = d3.max(data, function(d) {
    return Math.ceil(+d.size);
  });

  console.log(sortedData);
  console.log(data);

  var yScale = d3
    .scaleLinear()
    .domain([0, maxAudienceSize])
    .range([platformsHeight - margin.bottom, margin.top]);

  var xScale = d3
    .scaleBand()
    .domain(platforms)
    .rangeRound([margin.left, platformsWidth - margin.right])
    .padding(0.2);

  /* CREATE AXES */
  var xAxis = platformsSvg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${platformsHeight - margin.bottom})`)
    .call(d3.axisBottom().scale(xScale));
  var yAxis = platformsSvg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(yScale));

  xAxis
    .selectAll("text")
    .attr("transform", "rotate(45)")
    .attr("text-anchor", "start");

  var bars = platformsSvg
    .selectAll("rect")
    .data(sortedData)
    .enter()
    .append("rect")
    .attr("x", d => {
      return xScale(d.platform);
    })
    .attr("y", d => {
      return yScale(d.size);
    })
    .attr("height", d => {
      return platformsHeight - margin.bottom - yScale(d.size);
    })
    .attr("width", d => {
      return 10;
    })
    .attr("fill", color1);
});
