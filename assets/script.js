const sidebarButton = document.getElementById("sidebar-toggle");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const sidebar = document.getElementById("sidebar");
const sidebarLinks = sidebar.querySelectorAll("a");

sidebarButton.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("open");

    sidebarLinks.forEach(link => {
        link.tabIndex = isOpen ? 0 : -1;
    });
});

sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("open");

    sidebarLinks.forEach(link => {
        link.tabIndex = -1;
    });
});
