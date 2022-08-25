window.addEventListener('DOMContentLoaded', () => {
  //default load classes
  loadPage(sidebarClasses, containerClasses);
  console.log(type);
});

const sidebarClasses = document.getElementById('sidebar-btn-classes');
const sidebarLorem = document.getElementById('sidebar-btn-lorem');
const sidebarIpsum = document.getElementById('sidebar-btn-ipsum');
const containerClasses = document.getElementById('classes-page-container');
const containerLorem = document.getElementById('lorem-container');
const containerIpsum = document.getElementById('ipsum-container');
const containers = [containerClasses, containerLorem, containerIpsum];
const navs = [sidebarClasses, sidebarLorem, sidebarIpsum];

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
  }
}

sidebarClasses.addEventListener('click', () => {
  loadPage(sidebarClasses, containerClasses);
});
sidebarLorem.addEventListener('click', () =>
  loadPage(sidebarLorem, containerLorem)
);
sidebarIpsum.addEventListener('click', () => {
  loadPage(sidebarIpsum, containerIpsum);
});
