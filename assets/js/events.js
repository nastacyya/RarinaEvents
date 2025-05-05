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
    
    document.getElementById('events').style.color = "#AFDED9";

    await loadEvents();
});


async function loadEvents() {
    try {
        const response = await fetch('/api/event_data');
        const events = await response.json();
        const container = document.querySelector('.events_list');

        events.forEach(event => {
            container.innerHTML += `
                <div class="events_list_event">
                    <div class="event_poster">
                        <img src="assets/img/gallery/${event.image}" alt="${event.title}">
                    </div>
                    <div class="event_desc">
                        <h1>${event.title}</h1>
                        <p id="date_time">${event.dateTime}</p>
                        <p id="price">${event.price === 0 ? 'Bezmaksas' : event.price + '€'}</p>
                        <p id="desc">${event.description}</p>
                    </div>
                </div>
            `;
        });
        

    }
    catch (error) {
        console.error('Failed to load events:', error);
    }
}