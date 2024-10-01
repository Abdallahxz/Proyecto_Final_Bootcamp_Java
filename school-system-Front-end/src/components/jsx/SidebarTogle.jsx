import React, { useEffect, useRef } from 'react';

const SidebarToggle = () => {
  const sidebarRef = useRef(null);
  const sidebarToggleDesktopRef = useRef(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const sidebarToggleDesktop = sidebarToggleDesktopRef.current;

    function toggleSidebar() {
      if (sidebar.classList.contains('show')) {
        sidebar.classList.remove('show');
      } else {
        sidebar.classList.add('show');
      }
    }

    // Toggle sidebar on desktop screens
    sidebarToggleDesktop.addEventListener('click', toggleSidebar);

    // Cleanup event listener on component unmount
    return () => {
      sidebarToggleDesktop.removeEventListener('click', toggleSidebar);
    };
  }, []);

  return (
    <div>
      <div id="sidebar" ref={sidebarRef}>
        {/* Sidebar content */}
      </div>
      <button id="sidebarToggleDesktop" ref={sidebarToggleDesktopRef}>
        Toggle Sidebar
      </button>
    </div>
  );
};

export default SidebarToggle;