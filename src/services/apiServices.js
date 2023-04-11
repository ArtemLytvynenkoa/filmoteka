const API_KEY = '9e0534c53eaa3e6b360c0df64c81dcbe';
const BASE_URL = 'https://api.themoviedb.org/3/';

const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`;
  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(result.status);
    }
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.log(error);
  };
};

const fetchTrendingTV = async () => {
  const url = `${BASE_URL}trending/tv/week?api_key=${API_KEY}&language=en-US&page=1`;
  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(result.status);
    }
    const data = await result.json();
    return data.results;
  } catch (error) {
    console.log(error);
  };
};

const fetchPopularMovies = async pageNum => {
  const url = `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`;
  
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

const fetchPopularTV = async pageNum => {
  const url = `${BASE_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`;
  
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

const fetchMovieDetails = async movieId => {
  const url = `${BASE_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  
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

const fetchMovieCast = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
  
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

const fetchMovieReviews = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  
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

const fetchMovieTrailer = async movieId => {
  const url = `${BASE_URL}movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`;
  
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
  const url = `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${pageNum}&include_adult=true`;

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

const fetchSearchTV = async ({ searchQuery, pageNum }) => {
  const url = `${BASE_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${pageNum}&include_adult=true`;

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

const fetchTVDetails = async tvId => {
  const url = `${BASE_URL}tv/${tvId}?api_key=${API_KEY}&language=en-US`;
  
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

const fetchTVCast = async tvId => {
  const url = `${BASE_URL}tv/${tvId}/credits?api_key=${API_KEY}&language=en-US`;
  
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
const fetchTVReviews = async tvId => {
  const url = `${BASE_URL}tv/${tvId}/reviews?api_key=${API_KEY}&language=en-US&page=1`;
  
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

const fetchTVTrailer = async tvId => {
  const url = `${BASE_URL}tv/${tvId}/videos?language=en-US&api_key=${API_KEY}`;
  
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

const fetchMoviesGenres = async () => {
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
};

const fetchTVGenres = async () => {
  const url = `${BASE_URL}genre/tv/list?api_key=${API_KEY}&language=en-US`;

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
};

const fetchFilterMovies = async ({
  pageNum,
  genre,
  year,
  // originalLanguage,
  vote
}) => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    sort_by: 'popularity.desc',
    page: pageNum,
    include_adult: true,
    with_genres: genre,
    primary_release_year: year,
    // with_original_language: originalLanguage
  });

  const url = `${BASE_URL}discover/movie?${searchParams}&vote_average.gte=${vote}`;;

  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(result.status);
    };

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  };
};

const fetchFilterTV = async ({
  pageNum,
  genre,
  year,
  // originalLanguage,
  vote
}) => {
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    sort_by: 'popularity.desc',
    page: pageNum,
    include_adult: true,
    with_genres: genre,
    first_air_date_year: year,
    // with_original_language: originalLanguage
  });

  const url = `${BASE_URL}discover/tv?${searchParams}&vote_average.gte=${vote}`;;

  try {
    const result = await fetch(url);

    if (!result.ok) {
      throw new Error(result.status);
    };

    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  };
};

export const apiServices = {
  fetchTrendingMovies,
  fetchTrendingTV,
  fetchPopularMovies,
  fetchPopularTV,
  fetchMovieDetails,
  fetchSearchMovies,
  fetchSearchTV,
  fetchMoviesGenres,
  fetchTVGenres,
  fetchMovieCast,
  fetchMovieReviews,
  fetchMovieTrailer,
  fetchTVCast,
  fetchTVDetails,
  fetchTVReviews,
  fetchTVTrailer,
  fetchFilterMovies,
  fetchFilterTV,
}
