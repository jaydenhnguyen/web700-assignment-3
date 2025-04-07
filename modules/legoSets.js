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
require('dotenv').config();
require('pg');
const Sequelize = require('sequelize');

class LegoData {
    constructor() {
        this.sequelizer = new Sequelize(
            process.env.PGDATABASE,
            process.env.PGUSER,
            process.env.PGPASSWORD,
            {
                host: process.env.PGHOST,
                dialect: 'postgres',
                port: 5432,
                dialectOptions: {
                    ssl: { rejectUnauthorized: false },
            },
        });

        this.Theme = this.sequelizer.define('Theme', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: Sequelize.STRING
        }, {
            createdAt: false,
            updatedAt: false
        });

        this.Set = this.sequelizer.define('Set', {
            set_num: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            name: Sequelize.STRING,
            year: Sequelize.INTEGER,
            num_parts: Sequelize.INTEGER,
            theme_id: Sequelize.INTEGER,
            img_url: Sequelize.STRING
        }, {
            createdAt: false,
            updatedAt: false
        });

        this.Set.belongsTo(this.Theme, {foreignKey: 'theme_id'});
    }

    initialize() {
        return new Promise((resolve, reject) => {
            this.sequelizer
                .sync()
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    getAllSets() {
        return new Promise((resolve, reject) => {
            this.Set.findAll({include: [this.Theme]})
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    getAllThemes() {
        return new Promise((resolve, reject) => {
            this.Theme.findAll()
                .then(data => resolve(data))
                .catch(err =>  reject(err));
        });
    }

    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            this.Set.findAll({
                include: [this.Theme],
                where: {
                    set_num: setNum
                }
            })
                .then(data => {
                    if (data.length > 0) resolve(data[0])
                    else reject("Unable to find requested set")
                })
                .catch(err => reject(err));
        });
    }

    getSetsByTheme(theme) {
        return new Promise((resolve, reject) => {
            this.Set.findAll({
                include: [this.Theme],
                where: {
                    '$Theme.name$': {
                        [Sequelize.Op.iLike]: `%${theme}%`
                    }
                }
            })
                .then(data => {
                    if (data.length > 0)  resolve(data)
                    else reject("Unable to find requested sets")
                })
                .catch(err => reject(err));
        });
    }

    addSet(setData) {
        return new Promise((resolve, reject) => {
            this.Set.create(setData)
                .then(() => resolve())
                .catch(err =>  reject(err.errors[0].message));
        });
    }

    deleteSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            this.Set.destroy({
                where: {
                    set_num: setNum
                }
            })
                .then(() => resolve())
                .catch((err) => reject(err.errors[0].message));
        });
    }

}

module.exports = { LegoData };
