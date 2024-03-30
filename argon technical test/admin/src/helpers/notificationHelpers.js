export const toastNotification = ({ title, description, status }) => {
  alert(`Notification: ${title} - ${description} - ${status}`);
};

export const sendNativeNotification = ({ title, body }) => {
  alert(`Notification: ${title} - ${body}`);
};