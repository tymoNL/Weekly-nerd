const files = [
    { filename: "/pages/weekly_nerd-1.html?id=1", name: "Kilian Valkhof", date: "2025-02-05", location: "WBH01B17", time: "16:00 uur", image: "/images/killian_valkhof.jpg" },
    { filename: "/pages/weekly_nerd-2.html?id=2", name: "Peter Paul Koch", date: "2025-02-12", location: "WBH01B17", time: "16:00 uur", image: "/images/ppt.jpg" },
    { filename: "/pages/weekly_nerd-3.html?id=3", name: "Cassie Evans", date: "2025-03-07", location: "BPH00B02", time: "13:00 uur", image: "/images/cassie_evans.png" },
    { filename: "/pages/weekly_nerd-4.html?id=4", name: "Jeremy Keith", date: "2025-03-12", location: "WBH01B17", time: "16:00 uur", image: "/images/jeremy_keith.jpg" },
    { filename: "/pages/weekly_nerd-5.html?id=5", name: "Rosa", date: "2025-04-04", location: "WBH01B17", time: "16:00 uur" },
    { filename: "/pages/weekly_nerd-6.html?id=6", name: "Niels leenheer", date: "2025-04-09", location: "WBH01B17", time: "16:00 uur", image: "/images/niels-leenheer.jpg" },
    { filename: "/pages/weekly_nerd-7.html?id=7", name: "Erik kroes", date: "2025-04-16", location: "KSH00A11", time: "16:00 uur", image: "/images/erik-kroes.jpg" },
    { filename: "/pages/weekly_nerd-8.html?id=8", name: "Nienke de Keijzer", date: "2025-04-16", location: "KSH00A11", time: "16:00 uur", image: "/images/nienke_de_keijzer.jpg" }
];


// Get the container element
const container = document.querySelector('.cardGrid');
const details = document.querySelector('.details');

// Loop through the files and create cards dynamically
if (container) {
    files.forEach((file, index) => {
        if (!file.image) { file.image = '/images/no-image.png'; }

        const sanitizedName = file.name.replace(/\s+/g, '-'); // Clean name for view-transition
        const card = `
            <article class="card">
                <a href="${file.filename}">
                    <img src="${file.image}" id="${sanitizedName}" alt="${file.name}" style="view-transition-name: ${sanitizedName};" />
                </a>
                <h4>${file.name}</h4>
                <p>
                    <i class="fa-solid fa-clock"></i>&#160;<i>${file.time ? file.time : "Tijd onbekend"}</i><br />
                    <i class="fa-solid fa-location-dot"></i>&#160;<small>${file.location ? file.location : ""}</small><br />
                    <small>${file.date}</small><br />
                    <a href="${file.filename}">Meer info</a>
                </p>
            </article>
        `;

        container.insertAdjacentHTML('beforeend', card);
    });

}

if (details) {
    // Check the URL for a specific "id" query parameter to match the selected person
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPersonId = urlParams.get('id'); // e.g., ?id=1 for the first person

    const selectedPerson = files.find((file, index) => file.filename.includes(`weekly_nerd-${selectedPersonId}.html`));

    if (selectedPerson) {
        if (!selectedPerson.image) {
            selectedPerson.image = '/images/no-image.png';
        }
        const sanitizedName = selectedPerson.name.replace(/\s+/g, '-'); // Replace spaces with hyphens

        const detailsHeader = `
            <div class="detailHeader">
                <h2>Weekly nerd #${selectedPersonId}</h2>
                <p>
                    <b>${selectedPerson.name}</b><br />
                    <i>${selectedPerson.date}</i>
                </p>
                <p>
                    <small><i class="fa-solid fa-clock"></i>&#160;${selectedPerson.time}</small><br /> 
                    <small><i class="fa-solid fa-location-dot"></i>&#160;${selectedPerson.location}</small>
                </p>
            </div>
        `;



        const detailsImage = `
            <div class="detailsImage">
                <img id="${sanitizedName}" src="${selectedPerson.image}" alt="${selectedPerson.name}" style="view-transition-name: ${sanitizedName};" />
            </div>
        `;

        details.insertAdjacentHTML('afterBegin', detailsImage);
        details.insertAdjacentHTML('afterBegin', detailsHeader);
    }
}


document.querySelectorAll('.card_image').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();

        const movieId = card.getAttribute('id');
        const targetUrl = `/movies/${movieId}`; // adjust depending on your site

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                window.location.href = targetUrl;
            });
        } else {
            window.location.href = targetUrl;
        }
    });
});