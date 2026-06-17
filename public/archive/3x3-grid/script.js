const tracks = document.querySelectorAll('.story-track');

const updateTrackCount = (track) => {
  const id = track.dataset.track;
  const counter = document.querySelector(`[data-count-for="${id}"]`);
  const cards = [...track.querySelectorAll('.story-card')];
  if (!counter || cards.length === 0) return;

  const trackLeft = track.getBoundingClientRect().left;
  const activeIndex = cards.reduce(
    (closest, card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      return distance < closest.distance ? { index, distance } : closest;
    },
    { index: 0, distance: Number.POSITIVE_INFINITY }
  ).index;

  counter.textContent = `${activeIndex + 1} / ${cards.length}`;
};

tracks.forEach((track) => {
  updateTrackCount(track);
  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => updateTrackCount(track));
  });
});

document.querySelectorAll('[data-track="gallery"], [data-track="choice"]').forEach((track) => {
  track.addEventListener('scroll', () => {
    track.classList.add('is-swiping');
    window.clearTimeout(track._swipeTimer);
    track._swipeTimer = window.setTimeout(() => track.classList.remove('is-swiping'), 220);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
