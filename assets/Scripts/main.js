document.addEventListener('DOMContentLoaded', () => {
  const notificationRows = document.querySelectorAll('.notification-row');
  const markAllAsReadButton = document.getElementById('mark-all-as-read');
  const badge = document.getElementById('unread-count');

  // Function to update badge count of unread notifications
  function updateBadgeCount() {
    const unreadCount = document.querySelectorAll('.notification-row:not(.active)').length;
    badge.textContent = unreadCount;
  }

  // Initialize badge count on page load
  updateBadgeCount();

  // Toggle individual notification read/unread on click
  notificationRows.forEach((row) => {
    row.addEventListener('click', () => {
      row.classList.toggle('active');
      updateBadgeCount();
    });
  });

  // Mark all notifications as read
  markAllAsReadButton.addEventListener('click', () => {
    notificationRows.forEach((row) => {
      row.classList.add('active');
    });
    updateBadgeCount();
  });
});
