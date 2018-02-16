var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://menakhaled:7711694138onepiece@ds133558.mlab.com:33558/menakhaled').then(function () {
    console.log('Connected')

}).catch(function (error) {
    console.log(error.message);
});
var Movie = mongoose.model('Movie', {
    name: String,
    Genre: String,
    IMDb_rating: Number,
    overview: String
});

/* GET home page. */
router.get('/myapi', function (req, res) {
    var arr = [{
        id: 1,
        name: "The Shawshank Redemption",
        path: "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
        IMDb_rating: 9.3,
        Genre: "Crime,drama",
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    }, {
        id: 2,
        name: "The Godfather",
        path: "/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
        IMDb_rating: 9.2,
        Genre: "Crime,drama",
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
    },
        {
            id: 3,
            name: " The Godfather: Part II",
            path: "/tHbMIIF51rguMNSastqoQwR0sBs.jpg",
            IMDb_rating: 9.0,
            Genre: "Crime,Drama",
            overview: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate."
        }, {
            id: 4,
            name: "The Dark Knight",
            path: "/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
            IMDb_rating: 9.0,
            Genre: "Action, Crime, Thriller",
            overview: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice."
        },
        {
            id: 5,
            name: " 12 Angry Men ",
            path: "/3W0v956XxSG5xgm7LB6qu8ExYJ2.jpg",
            IMDb_rating: 8.9,
            Genre: "Crime,Drama",
            overview: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence."
        },
        {
            id: 6,
            name: " Schindler's List",
            path: "/yPisjyLweCl1tbgwgtzBCNCBle.jpg",
            IMDb_rating: 8.9,
            Genre: " Biography, Drama, History",
            overview: "In German-occupied Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazi Germans."
        },
    ];
    res.json(arr);
});
router.get('/topmovies', function (req, res) {
    res.render('finalproject');
});
router.get('/api/movies', function (req, res) {
    Movie.find(function (error, movies) {
        res.json(movies);
    });
});
router.get('/movies', function (req, res, next) {
    res.render('index');
});
router.get('/movies/add', function (req, res) {
    res.render('add');

});
router.post('/api/movies', function (req, res) {
    var newMovie = req.param('movie');
    console.log(newMovie)
    // newMovie.IMDb_rating = parseInt(newMovie.IMDb_rating);
    console.log(newMovie)
    var databaseMovie = new Movie(newMovie);

    console.log(databaseMovie)
    databaseMovie.save().then(function () {
        res.json({
            isSuccess: true,
            message: "Movie Saved!"
        })
    }).catch(function (error) {
        res.json({
            isSuccess: false,
            message: error.message
        })

        console.log("Movie Saved");
    })
})
router.delete('/api/movies', function (req, res) {
    var id = req.param('id')
    Movie.findByIdAndRemove(id).then(function () {
        console.log('Deleted');
    }).catch(function (error) {
        console.log(error)
    })
})

module.exports = router;