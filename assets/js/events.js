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

        events.forEach((event, index) => {
            const isSmallScreen = window.innerWidth <= 560;

            container.innerHTML += `
                <div class="events_list_event">
                    <div class="event_poster">
                        <img src="assets/img/events/${event.image}" alt="${event.title}">
                    </div>
                    <div class="event_desc">
                        <h1>${event.title}</h1>
                        <p id="date_time">${event.dateTime}</p>
                        <p id="age">${event.age}</p>
                        <p id="price">${event.price} ${event.reserve === "" ? '' : ' | ' + event.reserve}</p>
                        
                        ${isSmallScreen ? `
                            <button class="show-more-btn" data-index="${index}">
                                <i class="fa fa-chevron-down"></i> Parādīt vairāk
                            </button>
                            <p id="desc-${index}" class="hidden-desc" style="display: none;">${event.description}</p>
                        ` : `
                            <p id="desc">${event.description}</p>
                        `}
                    </div>
                </div>
            `;
        });

        if (window.innerWidth <= 560) {
            setupShowMoreButtons();
        }
    }
    catch (error) {
        console.error('Failed to load events:', error);
    }
}

function setupShowMoreButtons() {
    const showBtns = document.querySelectorAll('.show-more-btn');
    showBtns.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            const desc = document.getElementById(`desc-${index}`);
            const icon = button.querySelector('i');
            const isHidden = desc.style.display === "none";

            desc.style.display = isHidden ? "block" : "none";
            button.innerHTML = `
                <i class="fa ${isHidden ? 'fa-chevron-up' : 'fa-chevron-down'}"></i> 
                ${isHidden ? 'Rādīt mazāk' : 'Parādīt vairāk'}
            `;
        });
    });
}
