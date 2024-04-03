const Showtime = require("../services/showtimeService")

const getShowtime = async (req, res) => {
    result = await Showtime.getAllShowtimes()
    for (var i = 0; i < result.length; i++) {
        let date = result[i].time
        date.setHours(date.getHours() + 7)
        result[i].time = date.toISOString().replace('T', ' ').substr(0, 19)
    }
    return res.render("showtime.ejs", { showtimes: result })
}

const postShowtime = async (req, res) => {
    await Showtime.insertShowtime(req.body)
    return res.redirect('/showtime')
}

const updateShowtime = async (req, res) => {
    await Showtime.updateShowTimeById(req.body)
    return res.redirect('/showtime')
}

const deleteShowtime = async (req, res) => {
    await Showtime.deleteShowtimeById(req.params.showtime_id)
    return res.redirect('/showtime')
}

const getShowtimeByFilmId = async (req, res) => {
    result = await Showtime.getShowtimeByFilmId(req.query.film_id, req.user.city_id)
    var time = {}
    // config date and add date to list
    for (var i = 0; i < result.length; i++) {
        var date = result[i].time
        date.setHours(date.getHours() + 7)
        date = date.toISOString()
        result[i].date = date.substr(0, 10)
        result[i].time = date.substr(11, 8)
        time[result[i].date] = {}
    }
    // add cinema name according to date
    for (var i = 0; i < result.length; i++) {
        time[result[i].date][result[i].name] = []
    }
    // add time
    for (var i = 0; i < result.length; i++) {
        time[result[i].date][result[i].name].push(result[i].time)
    }
    return res.status(200).json({
        message: 'success',
        data: time
    })
}

const getShowtimeById = async (req, res) => {

}

module.exports = {
    getShowtime,
    postShowtime,
    updateShowtime,
    deleteShowtime,
    getShowtimeByFilmId
}