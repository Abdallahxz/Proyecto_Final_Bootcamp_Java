document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleDesktop = document.getElementById('sidebarToggleDesktop');

    function toggleSidebar() {
        if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        } else {
            sidebar.classList.add('show');
        }
    }


    // Toggle sidebar on desktop screens
    sidebarToggleDesktop.addEventListener('click', toggleSidebar);
});