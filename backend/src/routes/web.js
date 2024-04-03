const express = require("express")
const film = require("../controllers/filmController")
const showtime = require("../controllers/showtimeController")
const router = express.Router()

// CRUD film
router.get("/film", film.getFilm)
router.post("/film/update", film.updateFilm)
router.post("/film/post", film.postFilm)
router.post("/film/delete/:film_id", film.deleteFilm)

router.get('/', (req, res) => {
    res.json({
        message: 'quandz'
    })
})

// CRUD showtime
router.get("/showtime", showtime.getShowtime)
router.post("/showtime/post", showtime.postShowtime)
router.post("/showtime/update", showtime.updateShowtime)
router.post("/showtime/delete/:showtime_id", showtime.deleteShowtime)

module.exports = router