// Fetch data from Drupal backend
import { fetchMenuItems } from './api/drupal.js';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registered"));
}

fetchMenuItems().then(items => {
  const content = document.getElementById('content');
  items.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<h3>${item.title}</h3><p>${item.body}</p>`;
    content.appendChild(div);
  });
});
  