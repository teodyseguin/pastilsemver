const API_BASE = 'https://your-drupal-backend.com/jsonapi/node/menu_item';

export async function fetchMenuItems() {
  const res = await fetch(API_BASE, {
    headers: {
      'Accept': 'application/vnd.api+json'
    }
  });
  const data = await res.json();
  return data.data.map(item => ({
    title: item.attributes.title,
    body: item.attributes.body?.value || ""
  }));
}
