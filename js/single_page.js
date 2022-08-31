window.addEventListener('DOMContentLoaded', () => {
  //default load classes
  loadPage(sidebarClasses, containerClasses);
  console.log(type);
});

const sidebarClasses = document.getElementById('sidebar-btn-classes');
const sidebarAssignments = document.getElementById('sidebar-btn-Assignments');
const sidebarTests = document.getElementById('sidebar-btn-Tests');
const containerClasses = document.getElementById('classes-page-container');
const containerAssignments = document.getElementById(
  'assignments-page-container'
);
const containerTests = document.getElementById('tests-page-container');
const containers = [containerClasses, containerAssignments, containerTests];
const navs = [sidebarClasses, sidebarAssignments, sidebarTests];

function loadPage(nav, container) {
  containers.forEach((container) => {
    container.style.display = 'none';
  });
  navs.forEach((nav) => {
    nav.classList.remove('active');
  });

  nav.classList.add('active');
  container.style.display = 'block';
  if (container === containerClasses) {
    loadClasses();
  } else if (container === containerAssignments) {
    loadForms('assignments');
  } else if (container === containerTests) {
    loadForms('tests');
  }
}

sidebarClasses.addEventListener('click', () => {
  loadPage(sidebarClasses, containerClasses);
});
sidebarAssignments.addEventListener('click', () => {
  loadPage(sidebarAssignments, containerAssignments);
});
sidebarTests.addEventListener('click', () => {
  loadPage(sidebarTests, containerTests);
});
