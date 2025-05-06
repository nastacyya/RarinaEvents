import { loadHeader, loadFooter, fetchLanguageData, updateContent } from './common.js';

document.addEventListener('DOMContentLoaded', async () => {
    await loadHeader();
    await loadFooter();

    const userPreferredLanguage = localStorage.getItem('language') || 'lv';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);

    const languageHTML = document.getElementById(userPreferredLanguage);
    if (languageHTML) {
        languageHTML.style.color = "#AFDED9";
    } else {
        console.error(`Element with id "${userPreferredLanguage}" not found`);
    }
    
    document.getElementById('gallery').style.color = "#AFDED9";
});

const gallery = document.querySelector('.gallery_images');
const modal = document.getElementById('myModal');
const modalImg = document.getElementById("modal-img");
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentIndex = 0;
let galleryImages = [];

function updateModalBtn() {
    modalImg.src = galleryImages[currentIndex].src;
  
    // Disable next button if on last image
    if (currentIndex >= galleryImages.length - 1) {
        nextBtn.style.opacity = "0";
        nextBtn.style.pointerEvents = "none";
    } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.pointerEvents = "auto";
    }
    // Disable prev button if on last image
    if (currentIndex === 0) {
        prevBtn.style.opacity = "0";
        prevBtn.style.pointerEvents = "none";
    } else {
        prevBtn.style.opacity = "1";
        prevBtn.style.pointerEvents = "auto";
    }
}

fetch('/api/gallery')
  .then(res => res.json())
  .then(images => {
    images.forEach(img => {
      gallery.innerHTML += `<div class="image_wrapper"><img src="/assets/img/gallery/${img}" alt="${img}"><div>`;
    });

    galleryImages = document.querySelectorAll(".image_wrapper img");
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => {
          currentIndex = index;
          modal.style.display = "flex";
          updateModalBtn();
        });
    });

  })
  .catch(err => console.error('Error fetching gallery images:', err));

nextBtn.addEventListener("click", () => {
    if (currentIndex < galleryImages.length - 1) {
        currentIndex++;
        updateModalBtn();
    }
});

prevBtn.addEventListener("click", () => {
    if (currentIndex <= galleryImages.length - 1) {
        currentIndex--;
        updateModalBtn();
    }
});

// When the user clicks outside image, close the modal
modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
});

// When the user clicks on <span> (x), close the modal
document.getElementById("close").onclick = function() { 
    modal.style.display = "none";
}






