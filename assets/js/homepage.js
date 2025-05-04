fetch('/assets/partials/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header_div').innerHTML = data;
});

fetch('/assets/partials/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer_div').innerHTML = data;
});

// When page is loaded
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'lv';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData, userPreferredLanguage);
});

// Onclick on language buttons
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    //location.reload();
}

async function setLanguage(lang) {
    await setLanguagePreference(lang);
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

async function fetchLanguageData(lang) {
    const response = await fetch(`/assets/locales/${lang}.json`);
    return response.json();
}

function updateContent(data, prefLang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = data[key];
    });
    let languageHTML = document.getElementById(`${prefLang}`);
    languageHTML.style.color = "#AFDED9";
}

const carousel = document.querySelector('.carousel_images');

function scroll (){
    carousel.scrollBy({left: -200,})
}
    
