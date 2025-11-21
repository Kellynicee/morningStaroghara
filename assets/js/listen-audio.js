// listen-audio.js
fetch('assets/js/sermons.json')
  .then((response) => response.json())
  .then((data) => {
    const audioList = document.getElementById('audio-list');
    const audios = data.audios.slice(0, 10); // Load first 10 audios

    audios.forEach((audio) => {
      const card = document.createElement('div');
      card.classList.add('col-md-6', 'col-lg-4');

      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${audio.title}</h5>
            <p class="card-text">Speaker: ${audio.speaker} | Date: ${audio.date} | Series: ${audio.series}</p>
            <audio controls style="width:100%; margin-bottom:10px;">
              <source src="${audio.audioUrl}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
            <a href="${audio.audioUrl}" download class="btn btn-outline-primary">Download</a>
          </div>
        </div>
      `;
      audioList.appendChild(card);
    });
  })
  .catch((err) => console.error('Error loading audio data:', err));
