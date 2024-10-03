import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = '46141874-6e703aba01419e220f8d650c5';

export async function fetchImages(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });
  return response.data;
}
    