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
    images.slice(0, 4).forEach(img => {
      carousel.innerHTML += `<div class="image_container"><img src="/assets/img/gallery/${img}" alt="${img}"></div>`;
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

document.querySelector('form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
      firstname: document.getElementById('fname').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
  };

  try {
      const res = await fetch('/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      const userLang = localStorage.getItem('language') || 'lv';
      const langData = await fetchLanguageData(userLang);

      if (res.ok) {
          alert(langData.submit_success);
          location.reload();
      } else {
          alert(langData.submit_error);
          location.reload();
      }
  } catch (err) {
      console.error('Kļūda:', err);

      const userLang = localStorage.getItem('language') || 'lv';
      const langData = await fetchLanguageData(userLang);

      alert(langData.submit_error);
      location.reload();
  }
});






