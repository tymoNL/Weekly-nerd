const files = [
    { name: "Kilian Valkhof", date: "2025-02-05", location: "WBH01B17", time: "16:00 uur", image: "images/killian_valkhof.jpg" },
    { name: "Peter Paul Koch", date: "2025-02-12", location: "WBH01B17", time: "16:00 uur", image: "images/ppt.jpg" },
    { name: "Cassie Evans", date: "2025-03-07", location: "BPH00B02", time: "13:00 uur", image: "images/cassie_evans.png" },
    { name: "Jeremy Keith", date: "2025-03-12", location: "WBH01B17", time: "16:00 uur", image: "images/jeremy_keith.jpg" },
    { name: "Rosa", date: "2025-04-04", location: "WBH01B17", time: "16:00 uur" },
    { name: "Niels leenheer", date: "2025-04-09", location: "WBH01B17", time: "16:00 uur", image: "images/niels_leenheer.jpg" },
    { name: "Erik kroes", date: "2025-04-16", location: "KSH00A11", time: "16:00 uur", image: "images/erik_kroes.jpg" },
    { name: "Nienke de Keijzer", date: "2025-04-16", location: "KSH00A11", time: "16:00 uur", image: "images/nienke_de_keijzer.jpg" },
    { name: "Dave Bitter", date: "2025-05-14", location: "IO digital", time: "16:00 uur", image: "images/dave_bitter.jpeg" },
    { name: "Steve Jonk", date: "2025-05-14", location: "IO digital", time: "16:20 uur", image: "images/steve_jonk.jpeg" },
    { name: "Clarce Verdel", date: "2025-05-14", location: "IO digital", time: "16:40 uur" },
    { name: "Marieke de Hoop", date: "2025-05-28", location: "KSH00A11", time: "16:00 uur" }
].map((file, index) => {
    const speakerNumber = index + 1;
    return {
        ...file,
        filename: `pages/weekly_nerd-${speakerNumber}.html?id=${speakerNumber}`
    };
});

const container = document.querySelector('.cardGrid');
const details = document.querySelector('.details');

// Loop through the files and create cards dynamically
if (container) {
    files.forEach((file, index) => {
        if (!file.image) { file.image = 'images/no-image.png'; }

        const sanitizedName = file.name.replace(/\s+/g, '-');
        const card = `
            <a href="${file.filename}" class="card">
                    <img src="${file.image}" id="${sanitizedName}" alt="${file.name}" style="view-transition-name: ${sanitizedName};" />
                <h4>${file.name}</h4>
                <p>
                    <i class="fa-solid fa-clock"></i>&#160;<i>${file.time ? file.time : "Tijd onbekend"}</i><br />
                    <i class="fa-solid fa-location-dot"></i>&#160;<small>${file.location ? file.location : ""}</small><br />
                    <small>${file.date}</small><br />
                </p>
            </a>
        `;

        container.insertAdjacentHTML('beforeend', card);
    });
}

if (details) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedPersonId = Number(urlParams.get('id'));

    const selectedPerson = files.find((file, index) => file.filename.includes(`weekly_nerd-${selectedPersonId}.html`));

    if (selectedPerson) {
        if (!selectedPerson.image) {
            selectedPerson.image = '../images/no-image.png';
        }
        const sanitizedName = selectedPerson.name.replace(/\s+/g, '-');

        const detailsHeader = `
                <h2>Weekly nerd #${selectedPersonId}</h2>
                <p>
                    <b>${selectedPerson.name}</b><br />
                    <i>${selectedPerson.date}</i>
                </p>
                <p>
                    <small><i class="fa-solid fa-clock"></i>&#160;${selectedPerson.time}</small><br /> 
                    <small><i class="fa-solid fa-location-dot"></i>&#160;${selectedPerson.location}</small>
                </p>
        `;

        const detailsImage = `
                <img id="${sanitizedName}" src="../${selectedPerson.image}" alt="${selectedPerson.name}" style="view-transition-name: ${sanitizedName};" />
        `;

        const breadcrumbs = `
            <a href="/index.html">Home</a> &gt; 
            <span>Weekly Nerd #${selectedPersonId}</span>
        `;

        const nextPreviousPerson = `
                <a href="${selectedPersonId > 1
                ? `weekly_nerd-${selectedPersonId - 1}.html?id=${selectedPersonId - 1}`
                : `weekly_nerd-${files.length}.html?id=${files.length}`
            }" class="previous">
                    <i class="fa-solid fa-arrow-left"></i> Vorige
                </a>
                <a href="${selectedPersonId < files.length
                ? `weekly_nerd-${selectedPersonId + 1}.html?id=${selectedPersonId + 1}`
                : `weekly_nerd-1.html?id=1`
            }" class="next">
                    Volgende <i class="fa-solid fa-arrow-right"></i>
                </a>
        `;

        details.querySelector('.detailHeader').insertAdjacentHTML('afterBegin', detailsHeader);
        details.querySelector('.detailsImage').insertAdjacentHTML('afterBegin', detailsImage);
        details.querySelector('.breadcrumbs').insertAdjacentHTML('afterBegin', breadcrumbs);
        details.querySelector('.nextPrevious').insertAdjacentHTML('afterBegin', nextPreviousPerson);
    }
}

const colorSwitch = document.querySelector('#colorSwitch');
const body = document.querySelector('body');
const colorSwitchIcon = document.querySelector('#colorSwitch i');

// Load mode from localStorage
const savedMode = localStorage.getItem('mode');
if (savedMode === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    colorSwitchIcon?.classList.add('fa-moon');
    colorSwitchIcon?.classList.remove('fa-sun');
} else {
    body.classList.add('light');
    body.classList.remove('dark');
    colorSwitchIcon?.classList.add('fa-sun');
    colorSwitchIcon?.classList.remove('fa-moon');
}

// Handle toggle
if (colorSwitch) {
    colorSwitch.addEventListener('click', () => {
        body.classList.toggle('dark');
        body.classList.toggle('light');

        colorSwitchIcon?.classList.toggle('fa-sun');
        colorSwitchIcon?.classList.toggle('fa-moon');

        const mode = body.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('mode', mode);
    });
}

// Toggle animations
const toggleButton = document.getElementById('toggleAnimationsBtn');
const animationStatus = document.querySelector('#animationStatus');

// Determine animation setting
let savedAnimations = localStorage.getItem('animationsEnabled');

// ✅ If no saved setting, check for prefers-reduced-motion
if (savedAnimations === null) {
    animationsEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
} else {
    animationsEnabled = savedAnimations === 'true';
}

// ✅ Apply the correct class to body
body.classList.toggle('noAnimations', !animationsEnabled);

// ✅ Set status and icon on load
updateAnimationStatus();
updateToggleIcon();

// ✅ Toggle on click
toggleButton.addEventListener('click', () => {
    animationsEnabled = !animationsEnabled;
    body.classList.toggle('noAnimations', !animationsEnabled); // Correct class
    localStorage.setItem('animationsEnabled', animationsEnabled);

    updateAnimationStatus();
    updateToggleIcon();
    showAnimationsInfo();
});

// ✅ Update status label
function updateAnimationStatus() {
    if (animationStatus) {
        animationStatus.textContent = animationsEnabled ? 'Enabled' : 'Disabled';
    }
}

// ✅ Update icon
function updateToggleIcon() {
    toggleButton.innerHTML = animationsEnabled
        ? '<i class="fa-solid fa-head-side-cough"></i>'
        : '<i class="fa-solid fa-head-side-cough-slash"></i>';
}

const animationsInfo = document.querySelector('.animationsInfo');

function showAnimationsInfo() {
    animationsInfo.style.display = 'block';

    if (animationsInfo) {
        setTimeout(() => {
            animationsInfo.style.display = 'none';
        }, 2000); // 2000 ms = 2 seconds
    }
}

