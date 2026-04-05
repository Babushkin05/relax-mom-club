// Slider
let position = 0;
const slideWidth = 296; // 280px + 16px gap

function slide(direction) {
    const track = document.getElementById('sliderTrack');
    const images = track.querySelectorAll('img');
    const maxPosition = -(images.length - 3) * slideWidth;

    position += direction * slideWidth;
    position = Math.max(maxPosition, Math.min(0, position));

    track.style.transform = `translateX(${position}px)`;
}

// Lightbox
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// Touch swipe for slider
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider-viewport').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-viewport').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) slide(1);
    if (touchEndX - touchStartX > 50) slide(-1);
});
