export const isFieldDisabled = (field, getFieldValue) => {
  if (field.componentProps.disabled && typeof (field.componentProps.disabled) === 'function') {
    return field.componentProps.disabled(getFieldValue);
  }

  if (field.componentProps.disabled && typeof (field.componentProps.disabled) === 'boolean') {
    return field.componentProps.disabled;
  }

  return false;
};

export const getGenresTextArray = (genres = [], allGenres) => {
  const genresName = genres.map(genreId => {
    return allGenres.find(genreObject => genreObject.id === genreId)?.name;
  });

  if (genresName.length === 0 ) return "Other"
  
  return genresName.join(', ');
};

export const getReleaseDate = releaseDate => {
  const date = new Date(releaseDate);

  if (releaseDate === "") {
    return  "";
  };
  
  return date.getFullYear();
};

export const getSelectYearOptions = () => {
  const startYear = 1907;
  const endYear = new Date().getFullYear();
  let options = [];

  for (let i = endYear; i >= startYear; i -= 1) {
    options.push({ value: i, label: i });  
  };

  return options;
};

export const getSelectVoteOptions = () => {
  let options = [];

  for (let i = 10; i >= 1; i -= 1) {
    options.push({ value: i, label: i === 10 ? 10 : `${i}+` });  
  };

  return options;
};