(function checkDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth(); // 0 = Jan, 8 = Sept

    if (!(day === 9 && month === 8)) {  
        // Not 9th September → redirect
        window.location.href = "forever.html";
    }
})();

const otpBox = document.getElementById("otp-container");
const welcomeScreen = document.getElementById("welcome-screen");
const startBtn = document.getElementById("start-btn");

const flame = document.getElementById("flame");
const candleArea = document.getElementById("candle-area");
const cakeArea = document.getElementById("cake-area");
const cake = document.getElementById("cake");
const cakeCut = document.getElementById("cake-cut");
const slash = document.getElementById("slash");
const message = document.getElementById("message");
const music = document.getElementById("bg-music");
const heartsContainer = document.getElementById("hearts");
const bouquetOverlay = document.getElementById("bouquet-overlay");

let knifeEnabled = false;
let hoverCount = 0;

const otpModal = document.getElementById("otpModal");
const otpInput = document.getElementById("otpInput");
const submitOtp = document.getElementById("submitOtp");
const otpError = document.getElementById("otpError");



// Always show OTP on page load
window.onload = () => {
    otpModal.classList.remove("hidden");
    welcomeScreen.classList.add("blur-md", "pointer-events-none");
};

submitOtp.addEventListener("click", () => {
    const otp = otpInput.value.trim();
    if (otp === "9914") {
        otpModal.classList.add("hidden");
        welcomeScreen.classList.remove("blur-md", "pointer-events-none");
        music.muted = false;
        music.play();
    } else {
        otpError.classList.remove("hidden");
        setTimeout(() => {
            window.location.href = "forever.html";
        }, 1500);
    }
});



// Start celebration on button click
startBtn.addEventListener("click", () => {
    welcomeScreen.classList.add("hidden"); // hide welcome screen
    music.muted = false;
    music.play();

    // Show candle & start sequence
    setTimeout(() => {
        flame.classList.remove("hidden");
        message.textContent = "Say blow — hover the flame to blow it out";
    }, 1500);
});

// Blow out flame
flame.addEventListener("mouseenter", blowOut);
flame.addEventListener("click", blowOut);

function blowOut() {
    flame.classList.add("hidden");
    message.textContent = "Now cut the cake 🎂";

    // Smoke particles
    for (let i = 0; i < 10; i++) {
        let smoke = document.createElement("div");
        smoke.className = "smoke";
        smoke.style.left = 50 + (Math.random() * 40 - 20) + "px";
        smoke.style.animationDelay = (i * 0.2) + "s";
        candleArea.appendChild(smoke);
        setTimeout(() => smoke.remove(), 2500);
    }

    // Hide candle, show cake & enable knife immediately
    setTimeout(() => {
        candleArea.classList.add("hidden");
        cakeArea.classList.remove("hidden");
        message.textContent = "Hover over the cake to cut it 🎂";
        enableKnife();
    }, 1000);
}

// Enable knife and slash
function enableKnife() {
    knifeEnabled = true;
    document.body.classList.add("knife-cursor"); // apply to whole page
}


// Handle slash & cake cut
cakeArea.addEventListener("mousemove", (e) => {
    if (!knifeEnabled) return;

    // Only trigger a slash if it hasn't been triggered for this hover
    if (cakeArea.dataset.slashTriggered === "true") return;

    // Show slash at mouse position
    slash.classList.remove("hidden");

    // Alternate slash direction
    if (hoverCount % 2 === 0) {
        slash.style.transform = "translate(-50%, -50%) rotate(-45deg)"; // "/"
    } else {
        slash.style.transform = "translate(-50%, -50%) rotate(45deg)"; // "\"
    }

    slash.style.animation = "slashAnim 0.6s forwards";
    setTimeout(() => {
        slash.classList.add("hidden");
        slash.style.animation = "";
    }, 600);

    hoverCount++;
    cakeArea.dataset.slashTriggered = "true"; // mark slash done for this hover

    if (hoverCount >= 2) {
        setTimeout(() => { cutCake(); }, 1200);
    }
});

// Reset slash trigger when mouse leaves
cakeArea.addEventListener("mouseleave", () => {
    cakeArea.dataset.slashTriggered = "false";
});

// Cut cake
function cutCake() {
    document.body.classList.remove("knife-cursor");
    cake.classList.add("hidden");
    cakeCut.classList.remove("hidden");

    message.textContent = "Happy 6th Anniversary! 💞 Click anywhere to exit...";

    // Confetti waves
    setTimeout(() => launchConfetti(), 200);
    setTimeout(() => launchConfetti(), 600);
    setTimeout(() => launchConfetti(), 1000);

    // Wait for click → Show bouquet
    document.body.addEventListener("click", showBouquet, { once: true });
}

function showBouquet() {
    bouquetOverlay.classList.add("active");
    message.textContent = "";

    // If user clicks → go to forever.html immediately
    setTimeout(() => {
        bouquetOverlay.addEventListener("click", () => {
            window.location.href = "forever.html";
        });
    }, 3000);

    // Otherwise, auto-redirect after 10s
    setTimeout(() => {
        window.location.href = "forever.html";
    }, 10000);
}


// Confetti
function launchConfetti() {
    for (let i = 0; i < 30; i++) {
        let conf = document.createElement("div");
        conf.className = "confetti";
        conf.style.backgroundColor = randomColor();
        conf.style.left = (window.innerWidth / 2 + (Math.random() * 300 - 150)) + "px";
        conf.style.top = "200px";
        conf.style.animationDuration = (2 + Math.random() * 2) + "s";
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3500);
    }
}

function randomColor() {
    const colors = ["#f87171", "#facc15", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Floating hearts
setInterval(() => {
    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "0px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}, 1200);
