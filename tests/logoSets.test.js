const { LegoData, NOT_FOUND_MESSAGE } = require('../modules/legoSets');

const allTestCases = [
    {
        funcName: 'initialize&getAllSets',
        testcases: [
            {
                name: 'Should correctly assign the theme name for each set',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    },

                    {
                        "set_num": "0011-2",
                        "name": "Town Mini-Figures",
                        "year": "1979",
                        "theme_id": "67",
                        "num_parts": "12",
                        "img_url": "https://cdn.rebrickable.com/media/sets/0011-2.jpg"
                    },
                ],
                mockThemeData: [
                    {"id": "1", "name": "Technic"},
                    {"id": "3", "name": "Competition"},
                    {"id": "67", "name": "Expert Builder"}
                ],
                expect: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg",
                        "theme": 'Technic',
                    },

                    {
                        "set_num": "0011-2",
                        "name": "Town Mini-Figures",
                        "year": "1979",
                        "theme_id": "67",
                        "num_parts": "12",
                        "img_url": "https://cdn.rebrickable.com/media/sets/0011-2.jpg",
                        "theme": 'Expert Builder',
                    },
                ]
            },

            {
                name: 'Should handle Non-existent themes gracefully',
                mockSetData: [
                    {
                        "set_num": "001-3",
                        "name": "Racing Car",
                        "year": "1985",
                        "theme_id": "99",  // Non-existent theme
                        "num_parts": "100",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-3.jpg"
                    }
                ],
                mockThemeData: [
                    {"id": "1", "name": "Technic"},
                    {"id": "3", "name": "Competition"},
                    {"id": "67", "name": "Expert Builder"}
                ],
                expect: [
                    {
                        "set_num": "001-3",
                        "name": "Racing Car",
                        "year": "1985",
                        "theme_id": "99",
                        "num_parts": "100",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-3.jpg",
                        "theme": 'unknown theme name',  // Default when theme is not found
                    }
                ]
            },

            {
                name: 'Should throw an error when dataset is empty',
                mockSetData: [],
                mockThemeData: [],
                expectError: 'Fail to get all dataset: Dataset is empty. Please run the initialize function first.',
            },

            {
                name: 'Should throw an error when dataset is Null or Undefined',
                mockSetData: null,
                mockThemeData: undefined,
                expectError: 'Fail to get all dataset: Dataset is empty. Please run the initialize function first.',
            },
        ]
    },


    {
        funcName: 'getSetByNum',
        testcases: [
            {
                name: 'Should return the correct set when it exists',
                input: '001-1',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    },
                    {
                        "set_num": "0011-2",
                        "name": "Town Mini-Figures",
                        "year": "1979",
                        "theme_id": "67",
                        "num_parts": "12",
                        "img_url": "https://cdn.rebrickable.com/media/sets/0011-2.jpg"
                    }
                ],
                mockThemeData: [
                    {"id": "1", "name": "Technic"},
                    {"id": "3", "name": "Competition"},
                    {"id": "67", "name": "Expert Builder"}
                ],
                expect: {
                    "set_num": "001-1",
                    "name": "Gears",
                    "year": "1965",
                    "theme_id": "1",
                    "num_parts": "43",
                    "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg",
                    "theme": 'Technic',
                }
            },

            {
                name: 'Should return error when dataset is empty',
                input: '001-1',
                mockSetData: [],
                mockThemeData: [],
                expectError: `Fail to get set with ID 001-1: Dataset is empty. Please run the initialize function first.`
            },

            {
                name: 'Should return message when set does not exist',
                input: '999-9', // Set that does not exist
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    }
                ],
                mockThemeData: [
                    {"id": "1", "name": "Technic"},
                    {"id": "3", "name": "Competition"},
                    {"id": "67", "name": "Expert Builder"}
                ],
                expect: `${NOT_FOUND_MESSAGE} with ID: 999-9`
            }
        ]
    },

    {
        funcName: 'getSetsByTheme',
        testcases: [
            {
                name: 'Should return error when dataset is empty',
                input: 'Technic',
                mockSetData: [],
                mockThemeData: [],
                expectError: 'Fail to get set with theme name Technic: Dataset is empty. Please run the initialize function first.'
            },

            {
                name: 'Should return message when no sets match the theme',
                input: 'Space',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme": "Technic",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    }
                ],
                mockThemeData: [{"id": "1", "name": "Technic"}],
                expect: 'Set not found with theme name: Space'
            },

            {
                name: 'Should return sets with theme name case insensitivity',
                input: 'technic',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    }
                ],
                mockThemeData: [{"id": "1", "name": "Technic"}],
                expect: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg",
                        "theme": "Technic"
                    }
                ]
            },

            {
                name: 'Should return all sets with the same theme',
                input: 'Technic',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    },
                    {
                        "set_num": "001-2",
                        "name": "Advanced Gears",
                        "year": "1970",
                        "theme_id": "1",
                        "num_parts": "65",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-2.jpg"
                    }
                ],
                mockThemeData: [{"id": "1", "name": "Technic"}],
                expect: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg",
                        "theme": "Technic"
                    },
                    {
                        "set_num": "001-2",
                        "name": "Advanced Gears",
                        "year": "1970",
                        "theme_id": "1",
                        "num_parts": "65",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-2.jpg",
                        "theme": "Technic"
                    }
                ]
            },

            {
                name: 'Should return sets with partial match of theme name',
                input: 'tech',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    }
                ],
                mockThemeData: [{"id": "1", "name": "Technic"}],
                expect: [
                    {
                        "set_num": "001-1",
                        "name": "Gears",
                        "year": "1965",
                        "theme_id": "1",
                        "num_parts": "43",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg",
                        "theme": "Technic"
                    }
                ]
            },

            {
                name: 'Should return sets with theme containing special characters',
                input: 'Expert-Builders',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Advanced Town",
                        "year": "1985",
                        "theme_id": "67",
                        "num_parts": "120",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    }
                ],
                mockThemeData: [{"id": "67", "name": "Expert-Builders"}],
                expect: [
                    {
                        "set_num": "001-1",
                        "name": "Advanced Town",
                        "year": "1985",
                        "theme_id": "67",
                        "num_parts": "120",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg",
                        "theme": "Expert-Builders"
                    }
                ]
            },

            {
                name: 'Should return sets that match one of the multiple themes',
                input: 'Expert Builder',
                mockSetData: [
                    {
                        "set_num": "001-1",
                        "name": "Advanced Town",
                        "year": "1985",
                        "theme_id": "67",
                        "num_parts": "120",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg"
                    },
                    {
                        "set_num": "001-2",
                        "name": "Expert Builders",
                        "year": "1990",
                        "theme_id": "1",
                        "num_parts": "130",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-2.jpg"
                    }
                ],
                mockThemeData: [{"id": "67", "name": "Expert Builder"}, {"id": "1", "name": "Technic"}],
                expect: [
                    {
                        "set_num": "001-1",
                        "name": "Advanced Town",
                        "year": "1985",
                        "theme_id": "67",
                        "num_parts": "120",
                        "img_url": "https://cdn.rebrickable.com/media/sets/001-1.jpg",
                        "theme": "Expert Builder"
                    }
                ]
            }
        ]
    }
];

async function testInitializeAndGetAllSets(testCases) {
    for (const testCase of testCases) {
        try {
            const legoDataTestingInstance = new LegoData(testCase.mockSetData, testCase.mockThemeData);

            // Initialize the dataset
            await legoDataTestingInstance.initialize();

            // If we have mock data, proceed to get all sets
            const setData = await legoDataTestingInstance.getAllSets()

            // If expected data is provided, compare with the actual result
            if (JSON.stringify(setData) === JSON.stringify(testCase.expect)) {
                console.log('\x1b[32m[PASS]\x1b[0m ' + testCase.name);
            } else {
                console.log('\x1b[31m[FAIL]\x1b[0m ' + testCase.name);
                console.log(`  Expected:`, JSON.stringify(testCase.expect, null, 2));
                console.log(`  Got:`, JSON.stringify(setData, null, 2));
            }

        } catch (error) {
            if (testCase.expectError && error === testCase.expectError) {
                console.log('\x1b[32m[PASS]\x1b[0m ' + testCase.name);
            } else {
                console.log('\x1b[31m[FAIL]\x1b[0m ' + testCase.name);
                console.log(`  Expected Error:`, testCase.expectError);
                console.log(`  Got Error:`, error);
            }
        }
    }
}


async function testGetSetByNum(testCases) {
    for (const testCase of testCases) {
        try {
            const legoDataTestingInstance = new LegoData(testCase.mockSetData, testCase.mockThemeData);
            await legoDataTestingInstance.initialize();

            const setData = await legoDataTestingInstance.getSetByNum(testCase.input);

            if (JSON.stringify(setData) === JSON.stringify(testCase.expect)) {
                console.log('\x1b[32m[PASS]\x1b[0m ' + testCase.name);
            } else {
                console.log('\x1b[31m[FAIL]\x1b[0m ' + testCase.name);
                console.log(`  Expected:`, testCase.expect);
                console.log(`  Got:`, setData);
            }
        } catch (error) {
            if (testCase.expectError && error === testCase.expectError) {
                console.log('\x1b[32m[PASS]\x1b[0m ' + testCase.name);
            } else {
                console.log('\x1b[31m[FAIL]\x1b[0m ' + testCase.name);
                console.log(`  Expected Error:`, testCase.expectError);
                console.log(`  Got Error:`, error);
            }
        }
    }
}

async function testGetSetsByTheme(testCases) {
    for (const testCase of testCases) {
        try {
            const legoDataTestingInstance = new LegoData(testCase.mockSetData, testCase.mockThemeData);
            await legoDataTestingInstance.initialize();

            const setsByTheme = await legoDataTestingInstance.getSetsByTheme(testCase.input);

            if (JSON.stringify(setsByTheme) === JSON.stringify(testCase.expect)) {
                console.log('\x1b[32m[PASS]\x1b[0m ' + testCase.name);
            } else {
                console.log('%c[FAIL] ' + `${testCase.name}`);
                console.log(`Expected:`, JSON.stringify(testCase.expect, null, 2));
                console.log(`Got:`, JSON.stringify(setsByTheme, null, 2));
            }
        } catch (error) {
            if (testCase.expectError && error === testCase.expectError) {
                console.log('\x1b[32m[PASS]\x1b[0m ' + testCase.name);
            } else {
                console.log('%c[FAIL] ' + `${testCase.name}`);
                console.log(`  Expected Error:`, testCase.expectError);
                console.log(`  Got Error:`, error);
            }
        }
    }
}

async function runTests() {
    console.log("\n ***************** Running UT *****************")
    for (let {funcName, testcases} of allTestCases) {
        switch (funcName) {
            case 'initialize&getAllSets':
                console.log(`----- Running test for initialize and getAllSets-----`);
                await testInitializeAndGetAllSets(testcases);
                console.log('\n');
                break;
            case 'getSetByNum':
                console.log(`----- Running test for getSetByNum-----`);
                await testGetSetByNum(testcases);
                console.log('\n');
                break;
            case 'getSetsByTheme':
                console.log(`----- Running test for getSetsByTheme-----`);
                await testGetSetsByTheme(testcases);
                console.log('\n');
                break;
            default:
                console.log(`Unknown function name to run test: ${funcName}`);
                console.log('\n');
        }
    }
}

setTimeout(
    () => {
        runTests()
            .then(() => console.log("***************** All test cases completed! *****************"))
    },
    500
)
