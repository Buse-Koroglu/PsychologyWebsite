function toggleTheme() {
    var body = document.body;
    var navbar = document.querySelector(".navbar");
    body.classList.toggle("dark-mode");
    navbar.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

function menuBar(){
 const menu = document.getElementById('menu');
 menu.classList.toggle("show");
 document.body.classList.toggle("menu-open");
}

function handleMenu() {
  const menu = document.getElementById("menu");

  if (window.innerWidth > 1287 && menu.classList.contains("show")) {
    menu.classList.remove("show");
    document.body.classList.remove("menu-open");
  }

  if (window.innerWidth <= 936) {
  const navLinks = document.querySelectorAll(".nav-links li");
    const iconMenu = document.querySelector("#menu .icons");

    if (iconMenu.dataset.filled !== "true") {
      const fragment = document.createDocumentFragment();

      navLinks.forEach(li => {
        const clone = li.cloneNode(true);

        const link = clone.querySelector("a, button");

        if (link) {
          const icon = document.createElement("i");
          icon.className ="ri-arrow-right-s-line";
          icon.style.marginRight = "5px"; 

          link.prepend(icon);
        }

        fragment.appendChild(clone);
      });

      iconMenu.insertBefore(fragment, iconMenu.firstChild);
      iconMenu.dataset.filled = "true";
    }
  }
};

window.addEventListener("resize", handleMenu);

window.addEventListener("DOMContentLoaded", function () {
    var savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.querySelector(".navbar").classList.add("dark-mode");
    }
    handleMenu();
});
