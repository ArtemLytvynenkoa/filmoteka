export const isFieldDisabled = (field, getFieldValue) => {
  if (field.componentProps.disabled && typeof (field.componentProps.disabled) === 'function') {
    return field.componentProps.disabled(getFieldValue);
  }

  if (field.componentProps.disabled && typeof (field.componentProps.disabled) === 'boolean') {
    return field.componentProps.disabled;
  }

  return false;
};

export const getGenresTextArray = (filmsGenres = [], allGenres) => {
  const genresName = filmsGenres.map(genreId => {
    return allGenres.find(genreObject => genreObject.id === genreId)?.name;
  });

  if (genresName.length === 0 ) return "Other"
  
  return genresName.join(', ');
}

export const getReleaseDate = releaseDate => {
  const date = new Date(releaseDate);

  if (releaseDate === "") {
    return  "";
  };
  
  return date.getFullYear();
}
