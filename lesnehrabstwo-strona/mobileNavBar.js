document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector(".mobile-menu-btn");
    const menu = document.querySelector(".mobile-menu");
    const nav = document.querySelector(".mobile-nav");
    const links = document.querySelectorAll(".mobile-menu-links a");

    if (!button || !menu || !nav) {
        return;
    }


    function openMenu() {

        menu.classList.add("active");

        nav.classList.add("menu-open");

        document.documentElement.classList.add("mobile-menu-open");
        document.body.classList.add("mobile-menu-open");

        button.setAttribute("aria-expanded", "true");

        menu.setAttribute("aria-hidden", "false");
    }


    function closeMenu() {

        menu.classList.remove("active");

        nav.classList.remove("menu-open");

        document.documentElement.classList.remove("mobile-menu-open");
        document.body.classList.remove("mobile-menu-open");
        
        button.setAttribute("aria-expanded", "false");

        menu.setAttribute("aria-hidden", "true");
    }


    button.addEventListener("click", function () {

        if (menu.classList.contains("active")) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    /* Close after clicking a page */

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMenu();

        });

    });


    /* ESC closes menu */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            menu.classList.contains("active")
        ) {

            closeMenu();

        }

    });


    /* Close if resized back to desktop */

    window.addEventListener("resize", function () {

        if (
            window.innerWidth > 991 &&
            menu.classList.contains("active")
        ) {

            closeMenu();

        }

    });

});