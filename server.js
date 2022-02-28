const express = require('express');
const app = express();

const { animals } = require('./data/animals');
























function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    //Nore that we save the animalsArray as filteredResults here:
    let filterdResults = animalsArray;
    if(query.personalityTraits) {
        //Save personalityTraits as a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            //Check the traits against each animal in the filteredResults array.
            //Remember, it is initially a copy of the animalsArray,
            //but here we're updating it for each trait in the .forEach() loop.
            //For each trait being targeted by the filter, the filteredResults,
            //so at the end we'll have an array of animals that have every one
            //of the traits when the .forEach() loop is finished
            filterdResults = filterdResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filterdResults = filterdResults.filter(animal => animal.diet === query.diet);   
    }
    if (query.species) {
        filterdResults = filterdResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filterdResults = filterdResults.filter(animal => animal.name === query.name)
    }
    return filterdResults;
}


app.get('/api/animals', (req, res) => {
   let results = animals;
   if (req.query) {
       results = filterByQuery(req.query, results);
   }
    res.json(results);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});