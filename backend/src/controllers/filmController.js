const Film = require("../services/filmService")

// Use for BackEnd
const getFilm = async (req, res) => {
    result = await Film.getAllFilms()
    for (var i = 0; i < result.length; i++) {
        let date = result[i].release_date
        date.setHours(date.getHours() + 7)
        result[i].release_date = date.toISOString().replace('T', ' ').substr(0, 10)
    }
    return res.render('film.ejs', { films: result })
}

const postFilm = async (req, res) => {
    await Film.insertFilm(req.body)
    return res.redirect('/film')
}

const updateFilm = async (req, res) => {
    console.log(req.body)
    await Film.updateFilmById(req.body)
    return res.redirect('/film')
}

const deleteFilm = async (req, res) => {
    await Film.deleteFilmById(req.params.film_id)
    return res.redirect('/film')
}

// Use for FrontEnd
const getFilmAPI = async (req, res) => {
    let films = await Film.getAllFilms()
    let now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }))
    now.setHours(now.getHours() + 7)

    for (let data in films) {
        let date = films[data]['release_date']
        date.setHours(date.getHours() - 17)
        films[data]['release_date'] = date
        if (date > now) {
            films[data]['showing'] = 0
        } else {
            films[data]['showing'] = 1
        }
    }
    return res.status(200).json({
        message: "success",
        data: films
    })
}

module.exports = {
    getFilm,
    postFilm,
    updateFilm,
    deleteFilm,

    getFilmAPI
}