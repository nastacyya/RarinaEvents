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

    document.getElementById('about_us').style.color = "#AFDED9";

});


// Display images in carousel
const carousel = document.querySelector('.carousel_images');

fetch('/api/gallery')
  .then(res => res.json())
  .then(images => {
    images.slice(0, 8).forEach(img => {
      carousel.innerHTML += `<img src="/assets/img/gallery/${img}" alt="${img}">`;
    });
  })
  .catch(err => console.error('Error fetching gallery images:', err));


const eventsBtn = document.getElementById('events-btn');
const galleryBtn = document.getElementById('gallery-btn');

eventsBtn.addEventListener('click', () => {
    window.location.href = '/events';
})
galleryBtn.addEventListener('click', () => {
    window.location.href = '/gallery';
})







