
fetch('/assets/partials/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header_div').innerHTML = data;
});

async function changeLanguage(lang) {
    await rememberSetLang(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

function rememberSetLang(lang) {
    localStorage.setItem("language", lang);
    location.reload();
}

function fetchLanguageData(lang) {

}

function updateContent(data) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.innerHTML = data[key];
    });
}