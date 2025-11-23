// ===== Sermons App =====
let sermons = [];
let currentPage = 1;
const sermonsPerPage = 6;

const sermonGrid = document.getElementById('sermon-grid');
const filterSelect = document.getElementById('sermon-filter');

// Create pagination container
const sermonPagination = document.createElement('div');
sermonPagination.className = 'sermon-pagination';
sermonGrid.parentNode.insertBefore(sermonPagination, sermonGrid.nextSibling);

// ===== Fetch Sermons JSON =====
fetch('assets/js/sermons.json')
  .then((res) => res.json())
  .then((data) => {
    sermons = data;
    renderSermons();
    renderPagination();
  })
  .catch((err) => console.error(err));

// ===== Render Sermons =====
function renderSermons(filter = 'all') {
  // Only remove **dynamic sermons**, keep the 3 static cards
  const staticCards = sermonGrid.querySelectorAll('.sermon-card');
  staticCards.forEach((card) => (card.dataset.static = 'true')); // mark static cards
  sermonGrid
    .querySelectorAll('[data-dynamic]')
    .forEach((card) => card.remove());

  let filteredSermons = sermons;
  if (filter !== 'all') {
    filteredSermons = sermons.filter(
      (s) =>
        s.date.includes(filter) || s.speaker === filter || s.series === filter
    );
  }

  const start = (currentPage - 1) * sermonsPerPage;
  const end = start + sermonsPerPage;
  const paginatedSermons = filteredSermons.slice(start, end);

  paginatedSermons.forEach((sermon) => {
    const card = document.createElement('div');
    card.className = 'sermon-card';
    card.dataset.dynamic = 'true';
    card.innerHTML = `
      <img src="${sermon.image}" alt="${sermon.title}" />
      <div class="sermon-content">
        <h3>${sermon.title}</h3>
        <p>Speaker: ${sermon.speaker} | Date: ${sermon.date}</p>
        <div class="sermon-buttons">
          <a href="watch-video.html?sermon=${sermon.id}" class="watch-btn">Watch Video</a>
          <a href="listen-audio.html?sermon=${sermon.id}" class="audio-btn">Listen Audio</a>
        </div>
      </div>
    `;
    sermonGrid.appendChild(card);
  });

  if (paginatedSermons.length === 0 && filteredSermons.length === 0) {
    sermonGrid.insertAdjacentHTML(
      'beforeend',
      '<p style="text-align:center; color:#555;">No sermons found.</p>'
    );
  }
}

// ===== Render Pagination =====
function renderPagination(filter = 'all') {
  sermonPagination.innerHTML = '';

  let filteredSermons = sermons;
  if (filter !== 'all') {
    filteredSermons = sermons.filter(
      (s) =>
        s.date.includes(filter) || s.speaker === filter || s.series === filter
    );
  }

  const totalPages = Math.ceil(filteredSermons.length / sermonsPerPage);
  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderSermons(filter);
      renderPagination(filter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    sermonPagination.appendChild(btn);
  }
}

// ===== Filter Dropdown =====
if (filterSelect) {
  filterSelect.addEventListener('change', (e) => {
    const selectedFilter = e.target.value;
    currentPage = 1;
    renderSermons(selectedFilter);
    renderPagination(selectedFilter);

    // Animate dropdown
    const selectEl = e.target;
    selectEl.style.transform = 'scale(1.05)';
    setTimeout(() => (selectEl.style.transform = 'scale(1)'), 150);
  });
}
