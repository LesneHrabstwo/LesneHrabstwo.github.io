//navbar
const navbarTekst = document.getElementById("navBarr");
const pokoje = document.getElementById("one");
const uslugi = document.getElementById("two");
const okolica = document.getElementById("three");
const kontact = document.getElementById("four");
const galeria = document.getElementById("five");



const desktopScreen = window.matchMedia("(min-width: 1500px)");

function handleLayoutChange(e) {
    if (e.matches) {
        // The viewport is WIDER than 768px (Desktop mode)
        console.log("Desktop detected: Activating desktop features.");
        runDesktopScripts();
    } else {
        // The viewport is 768px or SMALLER (Mobile mode)
        console.log("Mobile detected: Heavy scripts paused.");
        stopDesktopScripts();
    }
}

// 2. Run the check right away when the page loads
handleLayoutChange(desktopScreen);

// 3. Keep listening if the user rotates their phone or resizes their desktop browser
desktopScreen.addEventListener("change", handleLayoutChange);


// --- YOUR CUSTOM CODE GOES BELOW ---

function runDesktopScripts() {
   navbarTekst.addEventListener("mouseover", () => { 
    setTimeout(() => {
    pokoje.innerHTML = "01.Pokoje";
    uslugi.innerHTML = "02.Dodatki";
    okolica.innerHTML = "03.Okolica";
    kontact.innerHTML = "04.Kontact";
    galeria.innerHTML = "05.Galeria";
    }, 200);
    
});

navbarTekst.addEventListener("mouseout", () => { 
    pokoje.innerHTML = "01.";
    uslugi.innerHTML = "02.";
    okolica.innerHTML = "03.";
    kontact.innerHTML = "04.";
    galeria.innerHTML = "05.";
});
}
