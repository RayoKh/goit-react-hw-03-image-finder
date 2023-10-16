import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38556698-b3856d862faf8b4ab27b44b8c';

export const fetchImages = async (query, page, perPage) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images: ', error);
    return [];
  }
};
