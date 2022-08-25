window.addEventListener('DOMContentLoaded', () => {
  //default load classes
  loadClassesPage();
  console.log(type);
});

//Single page functions
sidebarClasses = document.getElementById('sidebar-btn-classes');
sidebarLorem = document.getElementById('sidebar-btn-lorem');
sidebarIpsum = document.getElementById('sidebar-btn-ipsum');
sidebarClasses.addEventListener('click', loadClassesPage);
sidebarLorem.addEventListener('click', loadLoremPage);
sidebarIpsum.addEventListener('click', loadIpsumPage);

function loadClassesPage() {
  document.getElementById('classes-page-container').style.display = 'block';
  document.getElementById('lorem-container').style.display = 'none';
  document.getElementById('ipsum-container').style.display = 'none';
  sidebarClasses.classList.add('active');
  sidebarLorem.classList.remove('active');
  sidebarIpsum.classList.remove('active');
  document.getElementById('new-class-btn').classList.remove('d-none');
  document.getElementById('content-title').classList.remove('d-none');

  loadClasses();
}
function loadLoremPage() {
  document.getElementById('classes-page-container').style.display = 'none';
  document.getElementById('lorem-container').style.display = 'block';
  document.getElementById('ipsum-container').style.display = 'none';
  sidebarClasses.classList.remove('active');
  sidebarLorem.classList.add('active');
  sidebarIpsum.classList.remove('active');
}
function loadIpsumPage() {
  document.getElementById('classes-page-container').style.display = 'none';
  document.getElementById('lorem-container').style.display = 'none';
  document.getElementById('ipsum-container').style.display = 'block';
  sidebarClasses.classList.remove('active');
  sidebarLorem.classList.remove('active');
  sidebarIpsum.classList.add('active');
}
