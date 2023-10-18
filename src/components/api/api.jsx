const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = '38556698-b3856d862faf8b4ab27b44b8c';

const fetchImages = async (query, page, perPage) => {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  if (response.ok) {
    return response.json();
  }

  return await Promise.reject(new Error(`Oops... that's all `));
};

const api = {
  fetchImages,
};

export default api;
