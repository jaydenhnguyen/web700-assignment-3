/********************************************************************************
 * WEB700 – Assignment 3
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Huu Duc Huy Nguyen | Student ID: 125109249 | Date: 11th, Feb, 2025
 *
 ********************************************************************************/

const { LegoData } = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const e = require("express");

const app = express()
const HTTP_PORT = 3000

/*Config API*/
const send404Page = (res) => {
    res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
};

app.get(['/', '/home'], (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get('/lego/sets', async (req, res) => {
    const theme = req.query.theme?.trim();

    try {
        const data = theme
            ? await legoData.getSetsByTheme(theme)
            : await legoData.getAllSets();

        if (data && data.length > 0) return res.json(data);

        send404Page(res);
    } catch (error) {
        send404Page(res);
    }
});

app.get('/lego/sets/:set_num', async (req, res) => {
    const { set_num } = req.params;

    try {
        const set = await legoData.getSetByNum(set_num);

        if (!set) {
            return send404Page(res);
        }

        res.json(set);
    } catch (error) {
        send404Page(res);
    }
});


/*Run the app*/
const legoData = new LegoData();

legoData
    .initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Example app listening on port ${HTTP_PORT}`)
        })
    })
    .catch(err => console.log(err));