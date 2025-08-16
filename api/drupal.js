const API_BASE = 'https://your-drupal-backend.com/jsonapi/node/menu_item';

export async function fetchMenuItems() {
  // const res = await fetch(API_BASE, {
  //   headers: {
  //     'Accept': 'application/vnd.api+json'
  //   }
  // });
  // const data = await res.json();
  // return data.data.map(item => ({
  //   title: item.attributes.title,
  //   body: item.attributes.body?.value || ""
  // }));

  return [
    {
      title: 'Chicken Pastil Only Regular',
      body: '',
      price: '0.00',
      image: '',
      code: 'cpor'
    },
    {
      title: 'Chicken Pastil Only Spicy',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Chicken Pastil Regular with Regular Rice',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Chicken Pastil Spicy with Regular Rice',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Chicken Pastil Lumpia (3 pcs) with Regular Rice',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Chicken Pastil Dumpling (3 pcs) with Regular Rice',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Chicken Pastil Lumpia',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Chicken Pastil Sisig',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Extra Regular Rice',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Extra Garlic Rice',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    },
    {
      title: 'Egg',
      body: '',
      price: '0.00',
      image: '',
      code: '',
    }
  ];
}
