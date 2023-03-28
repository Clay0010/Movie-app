
const useGenres = (selectedGenre) => {
    if (selectedGenre < 1 ) return '';

    const genreIds =  selectedGenre.map((g) => g.id)
    return genreIds.reduce((acc,curr)=> acc + ',' + curr)
}

export default useGenres;
