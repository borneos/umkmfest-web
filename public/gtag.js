// public/gtag.js
export const GA_TRACKING_ID = 'G-5RTMVZ3D2F'; // Replace with your actual Tracking ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
