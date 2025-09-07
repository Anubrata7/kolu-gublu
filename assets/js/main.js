AOS.init({ duration: 1500, once: true });

const toggleBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const closeIcon = document.getElementById("close-icon");

toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
});

// Close menu when clicking a link
document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
    });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function activateLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // adjust for header height
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove("text-pink-600");
                if (link.getAttribute("href") === `#${sectionId}`) {
                    link.classList.add("text-pink-600");
                }
            });
        }
    });
}

window.addEventListener("scroll", activateLink);

/* --------- Data --------- */
const highlights = [
    {
        name: "College",
        avatar: "./assets/images/hightlights/college-bg.png",
        videos: [
            { src: "./assets/images/hightlights/college/1 (1).mp4", song: "Buddhu Sa Mann" },
            { src: "./assets/images/hightlights/college/1 (2).mp4", song: "Raat Bhar" },
            { src: "./assets/images/hightlights/college/1 (3).mp4", song: "Samjhawan" },
            { src: "./assets/images/hightlights/college/1 (4).mp4", song: "Falak Tak" },
            { src: "./assets/images/hightlights/college/1 (5).mp4", song: "Arz Kya Hai" },
        ]
    },
    {
        name: "Holi",
        avatar: "./assets/images/hightlights/holi-bg.png",
        videos: [
            { src: "./assets/images/hightlights/holi/1 (1).mp4", song: "Radha Gori Gori" },
            { src: "./assets/images/hightlights/holi/1 (2).mp4", song: "Sahiba" },
            { src: "./assets/images/hightlights/holi/1 (3).mp4", song: "Shaky" },
        ]
    },
    {
        name: "Pandal Hopping",
        avatar: "./assets/images/hightlights/pandel-hopping-bg.png",
        videos: [
            { src: "./assets/images/hightlights/pandel-hopping/1 (1).mp4", song: "Deewaniyat" },
            { src: "./assets/images/hightlights/pandel-hopping/1 (2).mp4", song: "Kol Mere" },
            { src: "./assets/images/hightlights/pandel-hopping/1 (3).mp4", song: "Sandhli Savera" },
            { src: "./assets/images/hightlights/pandel-hopping/1 (4).mp4", song: "Dhaage" },
            { src: "./assets/images/hightlights/pandel-hopping/1 (5).mp4", song: "Dil Tu Jaan Tu" },
        ]
    },
    {
        name: "Park Trails",
        avatar: "./assets/images/hightlights/park-trails-bg.png",
        videos: [
            { src: "./assets/images/hightlights/park-trails/1 (1).mp4", song: "Dil Jhoom" },
            { src: "./assets/images/hightlights/park-trails/1 (2).mp4", song: "Hawayein" },
            { src: "./assets/images/hightlights/park-trails/1 (3).mp4", song: "Thodi Si Daru" },
            { src: "./assets/images/hightlights/park-trails/1 (4).mp4", song: "Baarishein" },
            { src: "./assets/images/hightlights/park-trails/1 (5).mp4", song: "Phir Kabhi" },
            { src: "./assets/images/hightlights/park-trails/1 (6).mp4", song: "Billo Rani" },
        ]
    },
    {
        name: "Tasty Bites",
        avatar: "./assets/images/hightlights/tasty-bites-bg.png",
        videos: [
            { src: "./assets/images/hightlights/tasty-bites/1 (1).mp4", song: "Tea Vibes" },
            { src: "./assets/images/hightlights/tasty-bites/1 (2).mp4", song: "Foodie Vibes" },
            { src: "./assets/images/hightlights/tasty-bites/1 (3).mp4", song: "Foodie Vibes" },
            { src: "./assets/images/hightlights/tasty-bites/1 (4).mp4", song: "Foodie Vibes" },
            { src: "./assets/images/hightlights/tasty-bites/1 (5).mp4", song: "Foodie Vibes" },
            { src: "./assets/images/hightlights/tasty-bites/1 (6).mp4", song: "Foodie Vibes" },
            { src: "./assets/images/hightlights/tasty-bites/1 (7).mp4", song: "Foodie Vibes" },
        ]
    },
    {
        name: "Golden Hours",
        avatar: "./assets/images/hightlights/golden-hours-bg.png",
        videos: [
            { src: "./assets/images/hightlights/golden-hours/1 (1).mp4", song: "Suno Na Sangemarmar" },
            { src: "./assets/images/hightlights/golden-hours/1 (2).mp4", song: "Tere Hawaale" },
            { src: "./assets/images/hightlights/golden-hours/1 (3).mp4", song: "Afsos" },
            { src: "./assets/images/hightlights/golden-hours/1 (4).mp4", song: "Raanjhana" },
            { src: "./assets/images/hightlights/golden-hours/1 (5).mp4", song: "Tera Fitoor" },
        ]
    }
];

/* --------- State --------- */
const STORY_DURATION = 20000; // ms per story
let currentHighlight = 0;
let currentVideo = 0;
let currentTransitionEl = null;
let currentTransitionHandler = null;

/* Elements */
const modalEl = document.getElementById('storyModal');
const videoEl = document.getElementById('storyVideo');
const progressContainer = document.getElementById('progressBars');
const headerAvatar = document.getElementById('headerAvatar');
const highlightNameEl = document.getElementById('highlightName');
const songTextEl = document.getElementById('songText');
const songThumb = document.getElementById('songThumb');

/* Open / Close */
function openStory(hIndex, vIndex) {
    currentHighlight = hIndex;
    currentVideo = vIndex;
    modalEl.classList.remove('hidden');
    modalEl.setAttribute('aria-hidden', 'false');
    playVideo();
}

function closeStory() {
    modalEl.classList.add('hidden');
    modalEl.setAttribute('aria-hidden', 'true');

    // cleanup transition listeners
    if (currentTransitionEl && currentTransitionHandler) {
        currentTransitionEl.removeEventListener('transitionend', currentTransitionHandler);
        currentTransitionEl = null;
        currentTransitionHandler = null;
    }

    // stop video
    try {
        videoEl.pause();
        videoEl.removeAttribute('src');
        videoEl.load();
    } catch (e) {/*ignore*/ }
}

/* Play a specific video (render progress bars too) */
function playVideo() {
    const highlight = highlights[currentHighlight];
    const videoData = highlight.videos[currentVideo];

    // set video source & play
    videoEl.src = videoData.src;
    videoEl.currentTime = 0;
    videoEl.play().catch(err => {
        // autoplay might be blocked on some browsers; still show UI.
        console.warn("Autoplay blocked or error:", err);
    });

    // header + song info
    headerAvatar.src = highlight.avatar;
    highlightNameEl.textContent = highlight.name;
    songTextEl.textContent = videoData.song;
    songThumb.src = highlight.avatar;

    // progress bars (rebuild)
    progressContainer.innerHTML = '';
    highlight.videos.forEach((_, i) => {
        const bar = document.createElement('div');
        bar.className = 'flex-1 h-1 bg-gray-700 rounded overflow-hidden';

        const fill = document.createElement('div');
        fill.className = 'h-full bg-white';
        // completed bars show full width instantly
        fill.style.width = i < currentVideo ? '100%' : '0%';

        // only the active one gets a transition class
        if (i === currentVideo) {
            // duration uses Tailwind arbitrary value class (works with CDN)
            fill.classList.add('transition-all', `duration-[${STORY_DURATION}ms]`, 'ease-linear');
        }

        bar.appendChild(fill);
        progressContainer.appendChild(bar);
    });

    // remove any previous transition listener
    if (currentTransitionEl && currentTransitionHandler) {
        currentTransitionEl.removeEventListener('transitionend', currentTransitionHandler);
        currentTransitionEl = null;
        currentTransitionHandler = null;
    }

    // animate the active fill by setting width to 100% (after next frame)
    const activeFill = progressContainer.children[currentVideo]?.firstChild;
    if (activeFill) {
        currentTransitionEl = activeFill;
        currentTransitionHandler = function onTransitionEnd(e) {
            if (e.propertyName === 'width') {
                // cleanup
                if (currentTransitionEl && currentTransitionHandler) {
                    currentTransitionEl.removeEventListener('transitionend', currentTransitionHandler);
                    currentTransitionEl = null;
                    currentTransitionHandler = null;
                }
                nextVideo();
            }
        };
        activeFill.addEventListener('transitionend', currentTransitionHandler);

        // trigger transition
        requestAnimationFrame(() => requestAnimationFrame(() => {
            activeFill.style.width = '100%';
        }));
    }
    videoEl.onended = () => {
        nextVideo();
    };
}

/* Next / Prev navigation */
function nextVideo() {
    // cleanup any running transition listener before switching
    if (currentTransitionEl && currentTransitionHandler) {
        currentTransitionEl.removeEventListener('transitionend', currentTransitionHandler);
        currentTransitionEl = null;
        currentTransitionHandler = null;
    }

    const highlight = highlights[currentHighlight];
    if (currentVideo < highlight.videos.length - 1) {
        currentVideo++;
    } else {
        currentHighlight = (currentHighlight + 1) % highlights.length;
        currentVideo = 0;
    }
    playVideo();
}

function prevVideo() {
    // cleanup any running transition listener before switching
    if (currentTransitionEl && currentTransitionHandler) {
        currentTransitionEl.removeEventListener('transitionend', currentTransitionHandler);
        currentTransitionEl = null;
        currentTransitionHandler = null;
    }

    if (currentVideo > 0) {
        currentVideo--;
    } else {
        currentHighlight = (currentHighlight - 1 + highlights.length) % highlights.length;
        currentVideo = highlights[currentHighlight].videos.length - 1;
    }
    playVideo();
}
function nextHighlight() {
    currentHighlight = (currentHighlight + 1) % highlights.length;
    currentVideo = 0;
    playVideo();
}

function prevHighlight() {
    currentHighlight = (currentHighlight - 1 + highlights.length) % highlights.length;
    currentVideo = 0;
    playVideo();
}

/* Keyboard support */
document.addEventListener("keydown", (e) => {
    if (!modalEl.classList.contains('hidden')) {
        if (e.key === "Escape") closeStory();
        if (e.key === "ArrowRight") nextVideo();
        if (e.key === "ArrowLeft") prevVideo();
    }
});

const gallery = document.getElementById("gallery");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

// Init Isotope
const iso = new Isotope(gallery, {
    itemSelector: ".gallery-item",
    layoutMode: "fitRows",
    transitionDuration: "0.4s"
});

// Pagination settings
let currentPage = 0;
const rowsPerPage = 2;
const colsPerPage = 4;
const itemsPerPage = rowsPerPage * colsPerPage;

// Show paginated + filtered items
function showPage(page, filter = "*") {
    let visibleItems = iso.getFilteredItemElements();

    if (filter !== "*" && filter !== "all") {
        const cleanFilter = filter.replace(".", "");
        visibleItems = visibleItems.filter(el => el.classList.contains(cleanFilter));
    }

    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    // Hide all, then show current page items
    iso.getItemElements().forEach(el => el.classList.add("hidden"));
    visibleItems.slice(start, end).forEach(el => el.classList.remove("hidden"));

    iso.arrange();

    // Prev/Next button state
    prevBtn.classList.toggle("hidden", page === 0);
    nextBtn.classList.toggle("hidden", visibleItems.length <= end);

    // Store state
    gallery.dataset.filter = filter;
    gallery.dataset.page = page;

    // Update Fancybox groups (ALL items of filter, not just 8)
    updateFancyboxGroups(filter);
}

// Prev button
prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage, gallery.dataset.filter);
    }
});

// Next button
nextBtn.addEventListener("click", () => {
    currentPage++;
    showPage(currentPage, gallery.dataset.filter);
});

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const filterValue = btn.getAttribute("data-filter");

        iso.arrange({ filter: filterValue });

        // Reset all buttons
        filterBtns.forEach(b => {
            b.classList.remove("bg-pink-600", "text-white");
            b.classList.add("bg-pink-100", "text-pink-400");
        });

        // Activate clicked button
        btn.classList.remove("bg-pink-100", "text-pink-400");
        btn.classList.add("bg-pink-600", "text-white");

        // Reset pagination
        currentPage = 0;
        showPage(currentPage, filterValue);
    });
});



// Fancybox grouping (all filtered items)
function updateFancyboxGroups(filter) {
    // Clear old groups
    document.querySelectorAll("#gallery [data-fancybox]").forEach(el => {
        el.removeAttribute("data-fancybox");
    });

    // Group name
    const groupName = (filter === "*" || filter === "all") ? "gallery-all" : `gallery-${filter.replace(".", "")}`;

    // 👉 Assign group to *all filtered items* (not just page)
    iso.getFilteredItemElements().forEach(item => {
        const link = item.querySelector("a");
        if (link) link.setAttribute("data-fancybox", groupName);
    });

    // Rebind Fancybox
    Fancybox.destroy(); // prevent duplicates
    Fancybox.bind("[data-fancybox]", {
        Thumbs: { autoStart: true },
        Toolbar: true,
        loop: true,
        groupAll: true,   // 🔑 ensures all grouped items loop
        infinite: true
    });
}
// Initial load
showPage(0, "*");


// Relationship Start Date
const startDate = new Date("Sep 09, 2019 00:00:00");

function updateTimers() {
    const now = new Date();

    // --- Next Anniversary ---
    let currentYear = now.getFullYear();
    let nextAnniversary = new Date(`Sep 09, ${currentYear} 00:00:00`);

    // If today is past Sept 9 this year → set to next year
    if (now > nextAnniversary) {
        nextAnniversary = new Date(`Sep 09, ${currentYear + 1} 00:00:00`);
    }

    document.getElementById("anniversary-date").innerText =
        nextAnniversary.toDateString();

    const distance = nextAnniversary - now;

    // If it's Anniversary Day (Sept 9 → whole day)
    const isAnniversaryDay =
        now.getDate() === 9 && now.getMonth() === 8; // month 8 = September (0-indexed)

    if (isAnniversaryDay) {
        // Hide countdown circles
        document.getElementById("countdown-container").classList.add("hidden");
        // Show happy anniversary message
        document.getElementById("anniversary-message").classList.remove("hidden");
    } else {
        document.getElementById("countdown-container").classList.remove("hidden");
        document.getElementById("anniversary-message").classList.add("hidden");

        // Update countdown normally
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }

    // --- Time Since 09 Sep 2019 (Years, Months, Days only) ---
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    document.getElementById("since-time").innerText =
        `${years} Years, ${months} Months,  ${days} Days`;
}

setInterval(updateTimers, 1000);
updateTimers();


const form = document.getElementById("wishForm");
const thankYou = document.getElementById("thankYou");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    let response = await fetch(form.action, {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        form.classList.add("hidden");
        thankYou.classList.remove("hidden");

        setTimeout(() => {
            thankYou.classList.add("hidden");
            form.classList.remove("hidden");
            form.reset(); // Clear fields after submission
        }, 2500);
    } else {
        alert("Something went wrong. Please try again.");
    }
});