const movies = require('./db.json');
let globalId = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },
    deleteMovie: (req, res) => {
        let {movieId: id} = req.params;
        let movieIndex = movies.findIndex(elem => elem.id === +id);
        console.log('Movie Id:',id);
        console.log('Movie Index:',movieIndex);

        movies.splice(movieIndex, 1);
        res.status(200).send(movies);
    },
    updateMovie: (req, res) => {
        let {movieId} = req.params; // movie id : 1
        let {type} = req.body; // plus || minus
        let movieIndex = movies.findIndex(el => el.id === +movieId);

        let movie = movies[movieIndex];

        if(+movie.rating === 5 && type === 'plus'){
            console.log('cannot go above 5')
            res.status(400).send('cannot go above 5');
        } else if( movie.rating == 0 && type === 'minus'){
            console.log('cannot go below 0')
            res.status(400).send('cannot go below 0');            
        } else if(type === 'plus'){
            movie.rating++;
            console.log('increment')
            res.status(200).send(movies);
        } else if(type === 'minus'){
            movie.rating--;
            console.log('decrement')
            res.status(200).send(movies);
        }else {
            res.sendStatus(400);
        }
    },
    createMovie: (req, res) => {
        let {title, rating, imageURL} = req.body;

        let newMovie = {
            id: globalId,
            title,
            rating,
            imageURL
        }
        movies.push(newMovie);

        res.status(200).send(movies);
        globalId++;
    },
};
