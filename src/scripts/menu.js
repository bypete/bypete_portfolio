document.addEventListener('astro:page-load', () => {
  document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('expanded');
  });
});

document.addEventListener('astro:before-preparation', () => {
  console.log('Before preparation event triggered');
});
