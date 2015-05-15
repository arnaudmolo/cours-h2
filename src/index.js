import d3 from 'd3';

function type(d){
    Object.keys(d).forEach(function(key) {
      const value = d[key];
      if (!isNaN(+value)) {
        d[key] = +value
      }
    });
    return d;
}

const width = 900;
const height = 900;

const innerWidth = width - 30;
const innerHeight = height - 30;

const radiusMin = 1;
const radiusMax = 6;

const xScale = d3.scale.linear()
  .range([0, innerWidth]);

const yScale = d3.scale.linear()
  .range([innerHeight, 0]);

const rScale = d3.scale.linear()
  .range([radiusMin, radiusMax]);

const colorScale = d3.scale.category10();

const svg = d3.select("body").append("svg")
  .attr("width",  width)
  .attr("height", height);

  function render(data){

    const xExt = d3.extent(data, function (d){
      return d.sepal_length;
    });

    const yExt = d3.extent(data, function (d){
      return d.petal_length;
    });

    const rExt = d3.extent(data, function(d){
      return d.sepal_width;
    })

    xScale.domain(xExt);

    yScale.domain(yExt);

    rScale.domain(rExt);

    const g = svg.append('g');

    const circles = g
      .selectAll("circle")
      .data(data);

    g
      .attr('transform', 'translate(15, 15)');

    circles
      .enter()
      .append("circle")
      .attr('stoke-width', 10)
      .attr('stroke', 'gray');

    circles
      .attr("cx", function (d){
        return xScale(d.sepal_length);
      })
      .attr("cy", function (d){
        return yScale(d.petal_length);
      })
      .attr('fill', function(d) {
        return colorScale(d.species);
      })
      .attr('r', function(d) {
        return rScale(d.sepal_width)
      })

    circles.exit().remove();
  }

d3.csv('world.csv', type, function(res) {
  console.log(res);
  render(res);
});
