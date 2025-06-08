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

    const menuIcon = document.querySelector(".menu");
    const nav = document.querySelector(".navigation");
    const lang = document.querySelector(".languages");
    let sidebarWrapper = null;

    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("change");
        sidebarWrapper = document.querySelector(".sidebar");

        if (!sidebarWrapper) {
            sidebarWrapper = document.createElement("div");
            sidebarWrapper.classList.add("sidebar");

            nav.parentNode.insertBefore(sidebarWrapper, nav);
            // Move elements inside sidebar
            sidebarWrapper.appendChild(nav);
            sidebarWrapper.appendChild(lang);

            requestAnimationFrame(() => {
                sidebarWrapper.classList.add("active");
            });

            document.body.style.overflow = "hidden";

        } else {
            hideSidebar(); 
        }
    });

    window.addEventListener("resize", () => {
        const sidebar = document.querySelector(".sidebar");
        if (window.innerWidth >= 992) {
             if (sidebar) {
                hideSidebar();
            }
        }
    });
}

function hideSidebar(){
    const header = document.getElementById("header");
    const sidebar = document.querySelector(".sidebar");
    const nav = document.querySelector(".navigation");
    const lang = document.querySelector(".languages");
    const menuIcon = document.querySelector(".menu");

    sidebar.classList.remove("active");
    setTimeout(() => {
        header.appendChild(nav);
        header.appendChild(lang);
        sidebar.remove();
        document.body.style.overflow = "";
        menuIcon.classList.remove("change");
    }, 300); 
}

export async function loadFooter() {
    const response = await fetch('/assets/partials/footer.html');
    const data = await response.text();
    document.getElementById('footer_div').innerHTML = data;

    const contactsHeader = document.getElementById("contacts");
    const foooter = document.getElementById('footer_div');

    contactsHeader.addEventListener("click", (e) => {
        e.preventDefault();
        const sidebar = document.querySelector(".sidebar");
        if (window.innerWidth <= 576 && sidebar && sidebar.classList.contains("active")) {
            hideSidebar();
        }
        foooter.scrollIntoView();
    })

    if(window.innerWidth <= 768){
        moveSocialLinks();
    }
    window.addEventListener("resize", () => {
        moveSocialLinks();
    });
}

function moveSocialLinks(){
    const contacts = document.querySelector(".contacts");
    const links = document.querySelector(".socials_links");
    const socials = document.querySelector(".socials");
    if (window.innerWidth <= 768) {
        contacts.appendChild(links);
    } else {
        socials.appendChild(links);
    }
}

export async function fetchLanguageData(lang) {
    const response = await fetch(`/assets/locales/${lang}.json`);
    const header_a = document.getElementById('header');
    if(lang == "ru"){
        document.body.style.fontFamily = '"Nunito Sans", sans-serif';
        header_a.style.fontWeight = "600";
    } else {
        document.body.style.fontFamily = '';
        header_a.style.fontWeight = "500";
    }
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
