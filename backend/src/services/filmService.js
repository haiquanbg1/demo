const conn = require("../config/database")

const getAllFilms = async () => {
    [result, field] = await conn.query("select * from films where deleted = 0")
    return result
}

const getFilmById = async (film_id) => {
    [result, field] = await conn.query(
        "select * from films where id = ?",
        [film_id]
    )
    return result
}

const insertFilm = async (film) => {
    await conn.query(
        "insert into films(title, description, release_date, language_id, director, actor, length, classify_id) values (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            film.title,
            film.description,
            film.release_date,
            film.language_id,
            film.director,
            film.actor,
            film.length,
            film.classify_id
        ]
    )
}

const updateFilmById = async (film) => {
    await conn.query(
        "update films set title = ?, description = ?, release_date = ?, language_id = ?, director = ?, actor = ?, length = ?, classify_id = ? where film_id = ?",
        [
            film.title,
            film.description,
            film.release_date,
            film.language_id,
            film.director,
            film.actor,
            film.length,
            film.classify_id,
            film.film_id
        ]
    )
}

const deleteFilmById = async (film_id) => {
    await conn.query(
        "update films set deleted = 1 where film_id = ?",
        [film_id]
    )
}

module.exports = {
    getAllFilms,
    insertFilm,
    updateFilmById,
    deleteFilmById
}