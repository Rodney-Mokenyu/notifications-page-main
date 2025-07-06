
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    // Use 'const' for elements that won't be reassigned.
    // Cache DOM lookups to avoid repeated queries.
    const notificationRows = document.querySelectorAll('.notification-row');
    const markAllAsReadButton = document.getElementById('mark-all-as-read');
    const unreadCountBadge = document.getElementById('unread-count'); // Renamed for clarity

    // --- Helper Function: Update Unread Count ---
    /**
     * Calculates the number of unread notifications and updates the display badge.
     * Notifications are considered unread if they *do not* have the 'active' class.
     */
    const updateUnreadCount = () => { // Using arrow function for conciseness
        const unreadNotifications = document.querySelectorAll('.notification-row:not(.active)');
        unreadCountBadge.textContent = unreadNotifications.length;

        // Add an ARIA live region update if the count changes, for accessibility.
        // This makes screen readers announce updates to the unread count.
        // It's already marked with aria-live="polite" in HTML,
        // so just updating textContent triggers it.
        // Optionally, you could also manage aria-atomic="true" here.
    };

    // --- Event Handlers ---

    /**
     * Handles the click event for an individual notification row.
     * Marks the clicked notification as read (adds 'active' class)
     * and then updates the unread count.
     * Prevents re-marking as unread.
     * @param {HTMLElement} row - The notification row element that was clicked.
     */
    const handleNotificationClick = (row) => {
        // Only add 'active' class if it's not already present.
        // This ensures a notification stays read once clicked.
        if (!row.classList.contains('active')) {
            row.classList.add('active');
            updateUnreadCount(); // Update count only if status changed
        }
    };

    /**
     * Handles the click event for the "Mark all as read" button.
     * Iterates through all notification rows and marks them as read.
     */
    const handleMarkAllAsReadClick = () => {
        notificationRows.forEach(row => {
            // Only add 'active' if not already present to avoid unnecessary DOM manipulation
            // and ensure logic is consistent.
            if (!row.classList.contains('active')) {
                row.classList.add('active');
            }
        });
        updateUnreadCount(); // Update count after all are marked
    };


    // --- Initialization & Event Listeners ---

    // 1. Initial Badge Count:
    // Set the correct unread count when the page first loads.
    updateUnreadCount();

    // 2. Individual Notification Clicks:
    // Attach event listeners to each notification row.
    notificationRows.forEach(row => {
        row.addEventListener('click', () => handleNotificationClick(row));
    });

    // 3. Mark All As Read Button:
    // Attach event listener to the "Mark all as read" button.
    markAllAsReadButton.addEventListener('click', handleMarkAllAsReadClick);

    // --- Accessibility Enhancement (Optional but good practice) ---
    // For interactive elements, consider adding keyboard accessibility if not covered by default.
    // Since these are div/article elements acting like buttons, adding a tabindex
    // and listening for 'Enter' key can improve usability for keyboard users.
    notificationRows.forEach(row => {
        row.setAttribute('tabindex', '0'); // Make it focusable
        row.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') { // Spacebar also often triggers buttons
                event.preventDefault(); // Prevent default scroll behavior for spacebar
                handleNotificationClick(row);
            }
        });
    });
});
