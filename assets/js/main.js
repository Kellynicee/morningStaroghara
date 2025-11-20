const typewriter = document.querySelector('.typewriter-text');
const phrase = 'MISSION';
let i = 0;

// Delay so it starts after fade-in
const START_DELAY = 1800;

function type() {
  if (i < phrase.length) {
    typewriter.textContent += phrase.charAt(i);
    i++;
    setTimeout(type, 150);
  } else {
    typewriter.style.borderRight = 'none'; // remove cursor when done
  }
}

window.addEventListener('load', () => {
  setTimeout(type, START_DELAY);
});

// Initialize Swiper for Upcoming Events
document.addEventListener('DOMContentLoaded', function () {
  // Swiper
  new Swiper('.upcomingSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
  });

  // Lightbox
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    zoomable: true,
  });
});
