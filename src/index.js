import d3 from 'd3';
import M from 'moment';
import _ from 'lodash';

const {round} = Math;

const stingToValue = (value) => round(value.slice(0, value.length-2))

d3.csv('./source-data.csv', (data) => {

  data = _(data);

  data.forEach((d) => d.Date = M(d.Date)).value();

  const extent = d3.extent(data.value(), (d, i) => d.Date.toDate());
  const viz = d3.select("#viz");
  const svg = viz.append('svg');
  const width = stingToValue(viz.style('width'));
  const height = stingToValue(viz.style('height'));
  const margin = Object.freeze({
    left: 50,
    top: 50,
    right: 50,
    bottom: 50
  });

  const groupedByYear = data.groupBy((d) => d.Date.get('year')).value();

  const xScale = d3
    .time
    .scale()
    .domain(extent)
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scale
    .linear()
    .domain([0, 100])
    .range([margin.top, height - margin.bottom]);

  const xAxis = d3
    .svg
    .axis()
    .scale(xScale)
    .orient('bottom');

  svg
    .attr('width', width)
    .attr('height', height);

  const scene = svg
    .append('g')
    .attr('class', 'scene');

  const axis = scene
    .append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${yScale(50)})`)
    .call(xAxis);

  const years = scene
    .append('g')
    .attr('class', 'years');

  const year = years
    .selectAll('g.year')
    .data(Object.keys(groupedByYear));

  year
    .exit()
    .remove()

  year
    .enter()
    .append('g')
    .attr('class',  (d) => `year year-${d}`);

  year
    .each(function(d, i) {

      const data = groupedByYear[d];
      const elem = d3.select(this);
      const attack = elem
        .selectAll('g.attack')
        .data(data);

      attack
        .exit()
        .remove()

      attack
        .enter()
        .append('g')
        .attr('class', 'attack');

      attack
        .each(function(d, i) {

          const elem = d3.select(this);
          const victim = elem
            .selectAll('rect.victim')
            .data([d]);

          victim
            .exit()
            .remove();

          victim
            .enter()
            .append('rect')
            .attr('class', 'victim');

        });

    });

});
























