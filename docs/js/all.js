// document.addEventListener("DOMContentLoaded", function () {
//     const navlinks = document.querySelectorAll(".nav-item .nav-link");
//     const currentURL = window.location.href;

//     navlinks.forEach(navLink => {
//         navLink.addEventListener("click", function (event) {
//             // event.preventDefault(); // Prevent default link behavior

//             // Remove active class from all tabs
//             navlinks.forEach(link => link.classList.remove("active"));

//             // Add active class to the clicked tab
//             this.classList.add("active");
//         });
//     });
// });



document.addEventListener("DOMContentLoaded", function () {
    const navlinks = document.querySelectorAll(".nav-item .nav-link");
    const currentURL = window.location.href;

    navlinks.forEach((navLink) => {
        

        if (navLink.href === currentURL) {
            navLink.classList.add("active");
        }
    });
});

