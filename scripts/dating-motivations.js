/* DEFINE DIMENSIONS AND GENERATE SVG */
var motivationsWidth = getWidth("#motivations-charts");
var motivationsHeight = getHeight("#motivations-charts");
var motivationsSvg = getInitialsvg("#motivations-charts", motivationsWidth, motivationsHeight);

d3.csv("./data/motivations-by-gender.csv").then(function(genderData) {
  d3.csv("./data/motivations-by-age.csv").then(function(ageData) {
    var genders = getHeaders(genderData, "motivation");
    var ages = getHeaders(ageData, "motivation");

    /* CREATE SCALES  */

    var motivations = genderData.map(function(d) {
      return d.motivation;
    });

    var yScale = getYScale(motivations, motivationsHeight);
    var xScale = getXScale(motivationsWidth);

    /* CREATE AXES */
    var xAxis = getXAxis(motivationsSvg, xScale, motivationsHeight);
    var yAxis = getYAxis(motivationsSvg, yScale);

    /* DRAW BARS FOR BAR CHART */
    renderGenderStatistics();

    var genderBarsGroup;
    var maleBars;
    var femaleBars;
    var genderColor;
    var genderLabels;

    function renderGenderStatistics() {
      genderBarsGroup = getBarsGroup(motivationsSvg, genderData);
      maleBars = getMaleBars(genderBarsGroup, "motivation", xScale, yScale);
      femaleBars = getFemaleBars(genderBarsGroup, "motivation", xScale, yScale);

      /* ADD LABELS */
      genderColor = getGenderColorCoding(motivationsSvg, genders, motivationsWidth);
      genderLabels = getGenderLabels(motivationsSvg, genders, motivationsWidth);
    }

    var ageBarsGroup;
    var youngBars;
    var middleBars;
    var olderBars;
    var ageColor;
    var ageLabels;

    function renderAgeStatistics() {
      ageBarsGroup = getBarsGroup(motivationsSvg, ageData);
      youngBars = getYoungBars(ageBarsGroup, "motivation", xScale, yScale);
      middleBars = getMiddleBars(ageBarsGroup, "motivation", xScale, yScale);
      olderBars = getOlderBars(ageBarsGroup, "motivation", xScale, yScale, motivationsWidth);

      /* ADD LABELS */
      ageColor = getAgeColorCoding(motivationsSvg, ages, motivationsWidth);
      ageLabels = getAgeLabels(motivationsSvg, ages, motivationsWidth);
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
