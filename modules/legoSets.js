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

const setDataJson = require("../data/setData.json");
const themeDataJson = require("../data/themeData.json");

const NOT_FOUND_MESSAGE = 'Set not found';
const SET_EMPTY_MESSAGE = 'Dataset is empty. Please run the initialize function first.';

class LegoData {
    static sets

    constructor() {
        LegoData.sets = [];
        this.setData = setDataJson;
        this.themeData = themeDataJson;
    }

    static validateEmptyDataset() {
        if (!LegoData.sets || LegoData.sets.length <= 0) {
            throw new Error(SET_EMPTY_MESSAGE);
        }
    }

    getThemeNameById(id) {
        return this.themeData?.find(item => item.id === id)?.name ?? 'unknown theme name';
    }

    initialize() {
        return new Promise((resolve, reject) => {
            try {
                if (this.setData.length <= 0 ) throw new Error(SET_EMPTY_MESSAGE);
                LegoData.sets = this.setData?.map(singleData => {
                    return {
                        ...singleData,
                        theme: this.getThemeNameById(singleData?.theme_id),
                    }
                });
                resolve();
            } catch (error) {
                return reject(`Fail to initialize the sets data with: ${error.message}`);
            }
        })

    }

    getAllSets() {
        return new Promise((resolve, reject) => {
            try {
                LegoData.validateEmptyDataset();

                return resolve(LegoData.sets);
            } catch (error) {
                return reject(`Fail to get all dataset: ${error.message}`);
            }
        })
    }

    getSetByNum(setNum) {
        return new Promise((resolve, reject) => {
            try {
                LegoData.validateEmptyDataset();

                const foundSet = LegoData.sets.find(set => set?.set_num === setNum);

                return resolve(foundSet);
            } catch (error) {
                return reject(`Fail to get set with ID ${setNum}: ${error.message}`);
            }
        })

    }

    getSetsByTheme(themeName) {
        return new Promise((resolve, reject) => {
            try {
                LegoData.validateEmptyDataset();

                const setsByTheme = LegoData.sets.filter(
                    singleData => singleData
                        .theme?.toLowerCase().includes(themeName.toLowerCase()));

                return resolve(setsByTheme);
            } catch (error) {
                return reject(`Fail to get set with theme name ${themeName}: ${error.message}`);
            }
        })
    }
}

module.exports = { LegoData, NOT_FOUND_MESSAGE };