// scroll-fade.js
// Usage: mark sections with class "fade-section"
// IntersectionObserver toggles "visible" class when section enters/exits viewport

(function () {
  const sections = document.querySelectorAll('.fade-section');
  if (!sections.length) return;

  // Respect reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    sections.forEach(s => s.classList.add('visible'));
    var welcome = document.querySelector('.main1 .welcome-animate');
    if (welcome) welcome.classList.add('visible');
    var photo = document.querySelector('.main1 .main1-photo-animate');
    if (photo) photo.classList.add('visible');
    var pageOneText = document.querySelector('.page-one-text-animate');
    if (pageOneText) pageOneText.classList.add('visible');
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // trigger a bit earlier/later depending on feel
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  sections.forEach(s => observer.observe(s));

  // Animate welcome-animate and main1-photo-animate in .main1
  var main1 = document.querySelector('.main1');
  var welcome = document.querySelector('.main1 .welcome-animate');
  var photo = document.querySelector('.main1 .main1-photo-animate');
  if (main1 && (welcome || photo)) {
    const main1Obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (welcome) welcome.classList.add('visible');
          if (photo) photo.classList.add('visible');
        } else {
          if (welcome) welcome.classList.remove('visible');
          if (photo) photo.classList.remove('visible');
        }
      });
    }, observerOptions);
    main1Obs.observe(main1);
  }

  // Animate page-one-text-animate in .page-one
  var pageOne = document.querySelector('.page-one');
  var pageOneText = document.querySelector('.page-one-text-animate');
  if (pageOne && pageOneText) {
    const pageOneObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          pageOneText.classList.add('visible');
        } else {
          pageOneText.classList.remove('visible');
        }
      });
    }, observerOptions);
    pageOneObs.observe(pageOne);
  }
})(); 