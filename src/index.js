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

const outerWidth = 500;
const outerHeight = 250;
const margin = {
  left: -50,
  right: -50,
  top: 0,
  left: 0
}

const peoplePerPixel = 100000;

const innerWidth = outerWidth - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;

const svg = d3.select('body').append('svg');

svg
  .attr('width', outerWidth)
  .attr('height', outerHeight);

const g = svg.append('g');

g
  .attr('transform', 'translate('+ margin.left +', ' + margin.top + ')')

const xScale = d3.scale.linear().range([0, innerWidth]);
const yScale = d3.scale.linear().range([innerHeight, 0]);
const rScale = d3.scale.sqrt();

function render(data) {

  xScale
    .domain(d3.extent(data, (d) => d.longitude));

  yScale
    .domain(d3.extent(data, (d) => d.latitude));

  rScale
    .domain([0, d3.max(data, (d) => d.population)]);

}

d3.csv('world.csv', type, function(data) {
  render(data);
})
