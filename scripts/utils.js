function getHeaders(data, exception) {
  return d3.keys(data[0]).filter(function(key) {
    return key !== exception;
  });
}

function getYScale(domain, height) {
  return d3
    .scaleBand()
    .domain(domain)
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.2);
}

function getXScale(width) {
  return d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);
}

function getXAxis(svg, scale, height) {
  return svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom()
        .scale(scale)
        .tickFormat(d => d + "%")
    );
}

function getYAxis(svg, scale) {
  return svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft().scale(scale));
}

function getWidth(selector) {
  return document.querySelector(selector).clientWidth;
}

function getHeight(selector) {
  return document.querySelector(selector).clientHeight;
}

function getInitialsvg(selector, width, height) {
  return d3
    .select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);
}
