document.addEventListener('DOMContentLoaded', function () {
  // Form submission
  const form = document.getElementById('acceptChristForm');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    formMessage.innerHTML = `<div class="alert alert-success text-center">
      Thank you, ${name}! We have received your submission. Someone from our ministry will reach out to you soon.
    </div>`;
    form.reset();
  });

  // Fade-in animation on scroll
  const faders = document.querySelectorAll(
    '.fade-in, .fade-in-left, .fade-in-right'
  );
  const appearOptions = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    });
  },
  appearOptions);

  faders.forEach((fader) => appearOnScroll.observe(fader));
});
