/********************************************************************************
 * WEB700 – Assignment 5
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Huu Duc Huy Nguyen | Student ID: 125109249 | Date: 14th, Mar, 2025
 *
 ********************************************************************************/

const { LegoData } = require("./modules/legoSets");
const express = require('express');
const path = require('path');
const e = require("express");
const {response} = require("express");

const app = express()
const HTTP_PORT = 3000

app.use(express.static(__dirname + '/public'))

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

app.get('/lego/add-set', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/add-set.html'));
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

app.get('/lego/themes', async (req, res) => {
    try {
        const allThemes = await legoData.getAllThemes();

        if (allThemes && allThemes.length > 0) return res.json(allThemes);

        send404Page(res);
    } catch (error) {
        send404Page(res);
    }
});

app.get('/lego/themes/:theme_id', async (req, res) => {
    const { theme_id } = req.params;

    try {
        const theme = await legoData.getThemeById(theme_id);

        if (!theme) {
            return res.send({code: 404, message: 'Unable to find requested theme'});
        }

        res.json(theme);
    } catch (error) {
        send404Page(res);
    }
});

app.get('/lego/add-test', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/add-set-demo.html'));
});

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/404.html'));
});


app.post('/lego/add-test', async (req, res) => {
    const testSet = {
        set_num: "123",
        name: "Test Set Name",
        year: "2024",
        theme_id: "366",
        num_parts: "500",
        img_url: "https://fakeimg.pl/375x375?text=[+Lego+]"
    };

    try {
        await legoData.addSet(testSet);
        res.redirect('/lego/sets');
    } catch (error) {
        res.status(422).send(error);
    }
});

app.post('/lego/remove-test', async (req, res) => {
    const setNum = "123";

    try {
        await legoData.removeSet(setNum);
        res.redirect('/lego/sets');
    } catch (error) {
        res.status(422).send(error);
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