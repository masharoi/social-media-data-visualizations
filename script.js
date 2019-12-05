const color0 = "#fa697c";
const color1 = "#ffc15e";
const color2 = "#e13a9d";
/* DEFINE DIMENSIONS AND GENERATE SVG */
var width = document.querySelector("#online-dating-charts").clientWidth;
var height = document.querySelector("#online-dating-charts").clientHeight;
var margin = { top: 30, left: 230, right: 50, bottom: 20 };

d3.csv("./data/motivations-by-gender.csv").then(function(genderData) {
  d3.csv("./data/motivations-by-age.csv").then(function(ageData) {
    var genders = d3.keys(genderData[0]).filter(function(key) {
      return key !== "motivation";
    });

    var ages = d3.keys(ageData[0]).filter(function(key) {
      return key !== "motivation";
    });

    var svg = d3
      .select("#online-dating-charts")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    /* CREATE SCALES  */

    var motivations = genderData.map(function(d) {
      return d.motivation;
    });

    var yScale = d3
      .scaleBand()
      .domain(motivations)
      .rangeRound([height - margin.bottom, margin.top])
      .padding(0.2);

    var xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([margin.left, width - margin.right]);

    /* CREATE AXES */
    var xAxis = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom()
          .scale(xScale)
          .tickFormat(d => d + "%")
      );

    var yAxis = svg
      .append("g")
      .attr("class", "axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft().scale(yScale));

    /* DRAW BARS FOR BAR CHART */

    renderGenderStatistics();

    var genderBarsGroup;
    var maleBars;
    var femaleBars;
    var genderColor;
    var genderLabels;

    function renderGenderStatistics() {
      genderBarsGroup = svg
        .selectAll(".dating-bars")
        .data(genderData)
        .enter()
        .append("g")
        .attr("class", "dating-bars");

      maleBars = genderBarsGroup
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
        .attr("fill", color1)
        .attr("transform", "translate(0,8)");

      femaleBars = genderBarsGroup
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
        .attr("fill", color0)
        .attr("transform", "translate(0,20)");

      /* ADD LABELS */
      genderColor = svg
        .selectAll(".dating-gender-color")
        .data(genders)
        .enter()
        .append("rect")
        .attr("class", "dating-gender-color")
        .attr("x", function(d) {
          return width - margin.right;
        })
        .attr("y", function(d) {
          return d === "female" ? margin.top + 15 : margin.top;
        })
        .attr("height", 10)
        .attr("width", function(d) {
          return 30;
        })
        .attr("fill", function(d) {
          return d === "female" ? color0 : color1;
        });

      genderLabels = svg
        .selectAll(".dating-label")
        .data(genders)
        .enter()
        .append("text")
        .attr("class", "dating-label")
        .attr("x", function(d) {
          return d === "female"
            ? width - margin.right - 45
            : width - margin.right - 35;
        })
        .attr("y", function(d) {
          return d === "female" ? margin.top + 25 : margin.top + 10;
        })
        .text(function(d) {
          return d === "female" ? "Female" : "Male";
        });
    }

    var ageBarsGroup;
    var youngBars;
    var middleBars;
    var olderBars;
    var ageColor;
    var ageLabels;

    function renderAgeStatistics() {
      ageBarsGroup = svg
        .selectAll(".dating-bars")
        .data(ageData)
        .enter()
        .append("g")
        .attr("class", "dating-bars");

      youngBars = ageBarsGroup
        .append("rect")
        .attr("x", function(d) {
          return xScale(0) + 1;
        })
        .attr("y", function(d) {
          return yScale(d.motivation);
        })
        .attr("height", 10)
        .attr("width", function(d) {
          return xScale(d.young) - xScale(0);
        })
        .attr("fill", color1)
        .attr("transform", "translate(0,3)");

      middleBars = ageBarsGroup
        .append("rect")
        .attr("x", function(d) {
          return xScale(0) + 1;
        })
        .attr("y", function(d) {
          return yScale(d.motivation);
        })
        .attr("height", 10)
        .attr("width", function(d) {
          return xScale(d.middleAge) - xScale(0);
        })
        .attr("fill", color0)
        .attr("transform", "translate(0,15)");

      olderBars = ageBarsGroup
        .append("rect")
        .attr("x", function(d) {
          return xScale(0) + 1;
        })
        .attr("y", function(d) {
          return yScale(d.motivation);
        })
        .attr("height", 10)
        .attr("width", function(d) {
          return xScale(d.older) - xScale(0);
        })
        .attr("fill", color2)
        .attr("transform", "translate(0,27)");

      /* ADD LABELS */
      ageColor = svg
        .selectAll(".dating-age-color")
        .data(ages)
        .enter()
        .append("rect")
        .attr("class", "dating-age-color")
        .attr("x", function(d) {
          return width - margin.right;
        })
        .attr("y", function(d) {
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
        .attr("width", function(d) {
          return 30;
        })
        .attr("fill", function(d) {
          switch (d) {
            case "young":
              return color1;
            case "middleAge":
              return color0;
            default:
              return color2;
          }
        });

      ageLabels = svg
        .selectAll(".dating-label")
        .data(ages)
        .enter()
        .append("text")
        .attr("class", "dating-label")
        .attr("x", function(d) {
          switch (d) {
            case "young":
              return width - margin.right - 72;
            case "middleAge":
              return width - margin.right - 73;
            default:
              return width - margin.right - 50;
          }
        })
        .attr("y", function(d) {
          switch (d) {
            case "young":
              return margin.top + 8;
            case "middleAge":
              return margin.top + 23;
            default:
              return margin.top + 37;
          }
        })
        .text(function(d) {
          switch (d) {
            case "young":
              return "18 to 34 years";
            case "middleAge":
              return "35 to 54 years";
            default:
              return "55+ years";
          }
        });
    }

    /* TOGGLING GRAPHS */
    document.getElementById("motivations-gender-radio").onclick = () => {
      ageBarsGroup.remove();
      youngBars.remove();
      middleBars.remove();
      olderBars.remove();
      ageColor.remove();
      ageLabels.remove();
      renderGenderStatistics();
    };

    document.getElementById("motivations-age-radio").onclick = () => {
      genderBarsGroup.remove();
      maleBars.remove();
      femaleBars.remove();
      genderColor.remove();
      genderLabels.remove();
      renderAgeStatistics();
    };
  });
});
