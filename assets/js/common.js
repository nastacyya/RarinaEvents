export async function loadHeader() {
    const response = await fetch('/assets/partials/header.html');
    const data = await response.text();
    document.getElementById('header_div').innerHTML = data;

    // Set up language switch buttons
    ['lv', 'ru', 'en'].forEach(lang => {
        const langBtn = document.getElementById(lang);
        if (langBtn) {
            langBtn.addEventListener('click', e => {
                e.preventDefault();
                localStorage.setItem('language', lang);
                location.reload();
            });
        }
    });

}

export async function loadFooter() {
    const response = await fetch('/assets/partials/footer.html');
    const data = await response.text();
    document.getElementById('footer_div').innerHTML = data;

    const contactsHeader = document.getElementById("contacts");
    const foooter = document.getElementById('footer_div');

    contactsHeader.addEventListener("click", (e) => {
        e.preventDefault();
        foooter.scrollIntoView();
    })
}

export async function fetchLanguageData(lang) {
    const response = await fetch(`/assets/locales/${lang}.json`);
    return response.json();
}

export function updateContent(data) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (data[key]) {
            element.innerHTML = data[key];
        }
    });
    
    // Update placeholder attributes
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (data[key]) {
            element.placeholder = data[key];
        }
    });
}
