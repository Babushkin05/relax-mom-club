// Slider
let position = 0;

function getSlideWidth() {
    const img = document.querySelector('.slider-track img');
    if (!img) return 296;
    return img.offsetWidth + 16; // ширина + gap
}

function slide(direction) {
    const track = document.getElementById('sliderTrack');
    const images = track.querySelectorAll('img');
    const slideWidth = getSlideWidth();
    const viewportWidth = track.parentElement.offsetWidth;
    const maxPosition = Math.max(0, (images.length * slideWidth) - viewportWidth - 16);

    if (direction === 1) {
        position = Math.min(position + slideWidth, maxPosition);
    } else {
        position = Math.max(position - slideWidth, 0);
    }

    track.style.transform = `translateX(-${position}px)`;
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

document.querySelector('.slider-viewport').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-viewport').addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) slide(1);
    if (touchEndX - touchStartX > 50) slide(-1);
});
