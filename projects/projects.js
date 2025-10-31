import { fetchJSON, renderProjects } from '../global.js';

// Load project data from JSON:
const projects = await fetchJSON('../lib/projects.json');

// Select container for where to render the project articles:
const projectsContainer = document.querySelector('.projects');

// Render each project w h2:
renderProjects(projects, projectsContainer, 'h2'); 

// Selecting title element
const titleElement = document.querySelector('.projects-title');

if (titleElement) {
    titleElement.textContent = `${projects.length} Projects `;
}