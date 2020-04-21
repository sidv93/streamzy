const getMovies = (req, res) => {
    console.log('in get movies');
    return res.send('Hello from movies');
};

export default {
    getMovies
};
