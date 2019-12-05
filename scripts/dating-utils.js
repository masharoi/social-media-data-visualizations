/* GENDER BARS */
function getBarsGroup(svg, data) {
  return svg
    .selectAll(".dating-bars")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "dating-bars");
}

function getMaleBars(svg, yParam, xScale, yScale) {
  return svg
    .append("rect")
    .attr("x", function(d) {
      return xScale(0) + 1;
    })
    .attr("y", function(d) {
      return yScale(d[yParam]);
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return xScale(d.male) - xScale(0);
    })
    .attr("fill", color1)
    .attr("transform", "translate(0,8)");
}

function getFemaleBars(svg, yParam, xScale, yScale) {
  return svg
    .append("rect")
    .attr("x", function(d) {
      return xScale(0) + 1;
    })
    .attr("y", function(d) {
      return yScale(d[yParam]);
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return xScale(d.female) - xScale(0);
    })
    .attr("fill", color0)
    .attr("transform", "translate(0,20)");
}

/* AGE BARS */

function getYoungBars(svg, yParam, xScale, yScale) {
  return svg
    .append("rect")
    .attr("x", function(d) {
      return xScale(0) + 1;
    })
    .attr("y", function(d) {
      return yScale(d[yParam]);
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return xScale(d.young) - xScale(0);
    })
    .attr("fill", color1)
    .attr("transform", "translate(0,3)");
}

function getMiddleBars(svg, yParam, xScale, yScale) {
  return svg
    .append("rect")
    .attr("x", function(d) {
      return xScale(0) + 1;
    })
    .attr("y", function(d) {
      return yScale(d[yParam]);
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return xScale(d.middleAge) - xScale(0);
    })
    .attr("fill", color0)
    .attr("transform", "translate(0,15)");
}

function getOlderBars(svg, yParam, xScale, yScale, width) {
  return svg
    .append("rect")
    .attr("x", function(d) {
      return xScale(0) + 1;
    })
    .attr("y", function(d) {
      return yScale(d[yParam]);
    })
    .attr("height", 10)
    .attr("width", function(d) {
      return xScale(d.older) - xScale(0);
    })
    .attr("fill", color2)
    .attr("transform", "translate(0,27)");
}

/* AGE LABELS */
function getAgeLabels(svg, data, width) {
  return svg
    .selectAll(".dating-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "dating-label")
    .attr("x", d => {
      switch (d) {
        case "young":
          return width - margin.right - 72;
        case "middleAge":
          return width - margin.right - 73;
        default:
          return width - margin.right - 50;
      }
    })
    .attr("y", d => {
      switch (d) {
        case "young":
          return margin.top + 8;
        case "middleAge":
          return margin.top + 23;
        default:
          return margin.top + 37;
      }
    })
    .text(d => {
      switch (d) {
        case "young":
          return youngLabel;
        case "middleAge":
          return middleAgeLabel;
        default:
          return olderLabel;
      }
    });
}

function getAgeColorCoding(svg, data, width) {
  return svg
    .selectAll(".dating-age-color")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "dating-age-color")
    .attr("x", d => {
      return width - margin.right;
    })
    .attr("y", d => {
      switch (d) {
        case "young":
          return margin.top;
        case "middleAge":
          return margin.top + 15;
        default:
          return margin.top + 30;
      }
    })
    .attr("height", 10)
    .attr("width", d => {
      return 30;
    })
    .attr("fill", d => {
      switch (d) {
        case "young":
          return color1;
        case "middleAge":
          return color0;
        default:
          return color2;
      }
    });
}

/* GENDER LABELS */
function getGenderLabels(svg, data, width) {
  return svg
    .selectAll(".dating-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "dating-label")
    .attr("x", d => {
      return d === "female"
        ? width - margin.right - 45
        : width - margin.right - 35;
    })
    .attr("y", d => {
      return d === "female" ? margin.top + 25 : margin.top + 10;
    })
    .text(d => {
      return d === "female" ? "Female" : "Male";
    });
}

function getGenderColorCoding(svg, data, width) {
  return svg
    .selectAll(".dating-gender-color")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "dating-gender-color")
    .attr("x", d => {
      return width - margin.right;
    })
    .attr("y", d => {
      return d === "female" ? margin.top + 15 : margin.top;
    })
    .attr("height", 10)
    .attr("width", d => {
      return 30;
    })
    .attr("fill", d => {
      return d === "female" ? color0 : color1;
    });
}
