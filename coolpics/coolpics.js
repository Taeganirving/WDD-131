
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('nav');

function toggleMenu() {
    nav.classList.toggle('hide');
}

menuButton.addEventListener('click', toggleMenu);

// Image modal
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

gallery.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        modalImage.src = event.target.src.replace('-sm', '-full');
        modalImage.alt = event.target.alt;
        modal.showModal();
    }
});

closeButton.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
