/********************************************************************************
 * WEB700 – Assignment 6
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Huu Duc Huy Nguyen | Student ID: 125109249 | Date: 6th, Apr, 2025
 *
 ********************************************************************************/

const { LegoData } = require("./modules/legoSets");
const express = require('express');

const app = express()
const HTTP_PORT = 3000

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/*Config API*/
const send404Page = (res, message ="I'm sorry, we're unable to find what you're looking for.") => {
    res?.render('404',{message});
};

/*Config API*/
const send505Page = (res, message ="Internal Server Error") => {
    res?.render('505',{message});
};

app.get(['/', '/home'], (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/lego/add-set', async (req, res) => {
    const themes = await legoData.getAllThemes();
    res.render("addSet", {themes:themes});
});

app.get('/lego/sets', async (req, res) => {
    const theme = req.query.theme?.trim();

    try {
        const data = theme
            ? await legoData.getSetsByTheme(theme)
            : await legoData.getAllSets();

        if (data && data.length > 0) return res.render('sets', {sets: data});
        send404Page(res);
    } catch (error) {
        send404Page(res);
    }
});

app.get('/lego/set/:set_num', async (req, res) => {
    const { set_num } = req.params;

    try {
        const set = await legoData.getSetByNum(set_num);

        if (!set) {
            return send404Page(res);
        }

        res.render('set', {setDetail: set});
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

app.get('/lego/deleteSet/:setNum', async (req, res) => {
    const { setNum } = req.params;

    try {
        await legoData.deleteSetByNum(setNum);
        return res.redirect('/lego/sets');
    } catch (error) {
        return send505Page(res, error)
    }
});

app.get('/*', (req, res) => {
    return send404Page(res)
});




app.post('/lego/add-set', async (req, res) => {
    const {set_num, name, year, theme_id, num_parts, img_url} = await req.body;
    try {
        await legoData.addSet({set_num, name, year, theme_id, num_parts, img_url});
        await res.redirect('/lego/sets');
    } catch (error) {
        return send505Page(res, error);
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