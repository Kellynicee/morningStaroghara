// Fetch sermons and render
let sermons = [];
let currentPage = 1;
const sermonsPerPage = 6;

const sermonGrid = document.getElementById('sermon-grid');
const sermonPagination = document.getElementById('sermon-pagination');
const filterButtons = document.querySelectorAll('.sermon-filters button');

// Fetch JSON
fetch('assets/js/sermons.json')
  .then((res) => res.json())
  .then((data) => {
    sermons = data;
    renderSermons();
    renderPagination();
  })
  .catch((err) => console.error(err));

// Render sermons
function renderSermons(filter = 'all') {
  sermonGrid.innerHTML = '';

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
}

// Render pagination
function renderPagination() {
  sermonPagination.innerHTML = '';
  const totalPages = Math.ceil(sermons.length / sermonsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = i;
      renderSermons();
      renderPagination();
    });
    sermonPagination.appendChild(btn);
  }
}

// Filter buttons
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentPage = 1;
    renderSermons(btn.dataset.filter);
    renderPagination();
  });
});
