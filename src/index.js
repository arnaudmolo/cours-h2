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
  bottom: 0
}

const peoplePerPixel = 100000;

const innerWith = outerHeight - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;

const svg = d3.select('body').append('svg');

svg
  .attr('width', outerWidth)
  .attr('height', outerHeight)

const g = svg.append('g');

g
  .attr('transform', 'translate('+ margin.left +', '+ margin.top +')');

const xScale = d3.scale.linear().range([0, innerWith]);
const yScale = d3.scale.linear().range([innerHeight, 0]);
const rScale = d3.scale.sqrt();
const rMin   = 0;

function render(data) {

  xScale.domain(d3.extent(data, (d) => d.longitude));
  yScale.domain(d3.extent(data, (d) => d.latitude));
  rScale.domain(d3.extent(data, (d) => d.population));

  const peopleMax = rScale.domain()[1];
  const rMax = Math.sqrt(peopleMax / (peoplePerPixel * Math.PI));

  rScale.domain([rMin, rMax]);

  console.log([rMin, rMax]);

  const circles = g
    .selectAll('circle')
    .data(data);

  circles
    .exit()
    .remove();

  circles
    .enter()
    .append('circle');

  circles
    .attr('cx', (d) => xScale(d.longitude))
    .attr('cy', (d) => {
      console.log(d);
      console.log(yScale(d.latitude));
    })
    .attr('r', (d) => {
      return rScale(d.population);
    })

}

d3.csv('world.csv', type, function(res) {
  render(res);
})



