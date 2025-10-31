import { fetchJSON, renderProjects } from '../global.js';

// Load project data from JSON:
const projects = await fetchJSON('../lib/projects.json');

// Select container for where to render the project articles:
const projectsContainer = document.querySelector('.projects');

// function renderPieChart(projectsGiven) {
//     // re-calculate rolled data
//     let newRolledData = d3.rollups(
//       projectsGiven,
//       (v) => v.length,
//       (d) => d.year,
//     );
//     // re-calculate data
//     let newData = newRolledData.map(([year, count]) => {
//       return { ... }; // TODO
//     });
//     // re-calculate slice generator, arc data, arc, etc.
//     let newSliceGenerator = ...;
//     let newArcData = newSliceGenerator(...);
//     let newArcs = newArcData.map(...);
//     // TODO: clear up paths and legends
//     ...
//     // update paths and legends, refer to steps 1.4 and 2.2
//     ...
//   }

// Render each project w h2:
renderProjects(projects, projectsContainer, 'h2'); 
// renderPieChart(projects);

// Selecting title element
const titleElement = document.querySelector('.projects-title');

if (titleElement) {
    titleElement.textContent = `${projects.length} Projects `;
}


// D3 Stuff:
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let rolledData = d3.rollups(
  projects,
  (v) => v.length,
  (d) => d.year,
);
console.log(rolledData);


let data = rolledData.map(([year, count]) => {
    return { value: count, label: year };
  });

let sliceGenerator = d3.pie().value((d) => d.value);
let arcData = sliceGenerator(data);
let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
let arcs = arcData.map((d) => arcGenerator(d));

let colors = d3.scaleOrdinal(d3.schemeTableau10);

// Adding the pie chart segments:
arcs.forEach((arc, idx) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(idx))
})

// Creating all the <li></li> tags:
let legend = d3.select('.legend');
data.forEach((d, idx) => {
  legend.append('li')
    .attr('style', `--color:${colors(idx)}`)
    .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
});

let query = ''; 
let searchInput = document.querySelector('.searchBar'); //Searches for a searchBar-labeled element.

searchInput.addEventListener('input', (event) => {
  query = event.target.value;
  
  // TODO: Filtering and returning:
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });
  renderProjects(filteredProjects, projectsContainer, 'h2');
  //renderPieChart(filteredProjects);
});