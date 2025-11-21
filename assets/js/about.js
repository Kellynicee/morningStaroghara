// Animate sections when they come into view
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target all sections and cards
  const elementsToAnimate = document.querySelectorAll(
    '.about-us-section, .what-to-expect .expect-card, .vision-mission, .creed-section, .leader-card, .pastor-card, .our-churches .church-card'
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});
