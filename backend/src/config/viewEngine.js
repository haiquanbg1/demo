const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
    // config engine
    app.set("views", "./src/views");
    app.set("view engine", "ejs");

    // config static files
    app.use(express.static(path.join("./src", "public")));

    // config req.body
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
}

module.exports = configViewEngine;