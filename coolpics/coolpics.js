
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

// Toggle mobile navigation
function toggleMenu() {
    navLinks.classList.toggle('show');

    const isOpen = navLinks.classList.contains('show');
    menuButton.setAttribute('aria-expanded', isOpen);
}

menuButton.addEventListener('click', toggleMenu);

// Image modal elements
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('.image-viewer');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Open modal when an image is clicked
function openModal(event) {
    if (event.target.tagName === 'IMG') {
        const src = event.target.src;

        modalImage.src = src.replace('-sm', '-full');
        modalImage.alt = event.target.alt;

        modal.showModal();
    }
}

gallery.addEventListener('click', openModal);

// Close modal using X button
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal when clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        const rect = modal.getBoundingClientRect();

        const outside =
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom;

        if (outside) {
            modal.close();
        }
    }
});
