/* DEFINE DIMENSIONS AND GENERATE SVG */
var usageWidth = getWidth("#usage-charts");
var usageHeight = getHeight("#usage-charts");
var usageSvg = getInitialsvg("#usage-charts", usageWidth, usageHeight);

d3.csv("./data/usage-by-gender.csv").then(function(genderData) {
  d3.csv("./data/usage-by-age.csv").then(function(ageData) {
    var genders = getHeaders(genderData, "usage");
    var ages = getHeaders(ageData, "usage");

    /* CREATE SCALES  */
    var usages = genderData.map(function(d) {
      return d.usage;
    });

    var yScale = getYScale(usages, usageHeight);
    var xScale = getXScale(usageWidth);

    /* CREATE AXES */
    var xAxis = getXAxis(usageSvg, xScale, usageHeight);
    var yAxis = getYAxis(usageSvg, yScale);

    /* DRAW BARS FOR BAR CHART */

    renderGenderStatistics();

    var genderBarsGroup;
    var maleBars;
    var femaleBars;
    var genderColor;
    var genderLabels;

    function renderGenderStatistics() {
      genderBarsGroup = getBarsGroup(usageSvg, genderData);
      maleBars = getMaleBars(genderBarsGroup, "usage", xScale, yScale);
      femaleBars = getFemaleBars(genderBarsGroup, "usage", xScale, yScale);

      /* ADD LABELS */
      genderColor = getGenderColorCoding(usageSvg, genders, usageWidth);
      genderLabels = getGenderLabels(usageSvg, genders, usageWidth);
    }

    var ageBarsGroup;
    var youngBars;
    var middleBars;
    var olderBars;
    var ageColor;
    var ageLabels;

    function renderAgeStatistics() {
      ageBarsGroup = getBarsGroup(usageSvg, ageData);
      youngBars = getYoungBars(ageBarsGroup, "usage", xScale, yScale);
      middleBars = getMiddleBars(ageBarsGroup, "usage", xScale, yScale);
      olderBars = getOlderBars(ageBarsGroup, "usage", xScale, yScale, usageWidth);

      /* ADD LABELS */
      ageColor = getAgeColorCoding(usageSvg, ages, usageWidth);
      ageLabels = getAgeLabels(usageSvg, ages, usageWidth);
    }

    /* TOGGLING GRAPHS */
    document.getElementById("usage-gender-radio").onclick = () => {
      ageBarsGroup.remove();
      youngBars.remove();
      middleBars.remove();
      olderBars.remove();
      ageColor.remove();
      ageLabels.remove();
      renderGenderStatistics();
    };

    document.getElementById("usage-age-radio").onclick = () => {
      genderBarsGroup.remove();
      maleBars.remove();
      femaleBars.remove();
      genderColor.remove();
      genderLabels.remove();
      renderAgeStatistics();
    };
  });
});
