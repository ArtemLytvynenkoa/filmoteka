const API_KEY = '9e0534c53eaa3e6b360c0df64c81dcbe';
const BASE_URL = 'https://api.themoviedb.org/3/';

const fetchPopularMovies = async pageNum => {
  const url = `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${pageNum}`;
  
  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(result.status);
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
  };
};

const fetchSearchMovies = async ({ searchQuery, pageNum }) => {
  const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${pageNum}&include_adult=false`;

  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(result.status);
    }
    return await result.json();
  } catch (error) {
    console.log(error);
  };
};

const fetchGenres = async () => {
  const url = `${BASE_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;

  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(result.status);
    }
    const data = await result.json();
    return data.genres;
  } catch (error) {
    console.log(error);
  };
}

export const apiServices = {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchGenres,
}
