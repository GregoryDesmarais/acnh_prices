const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const db = require("../models");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newHorizon";
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

console.log("Starting scraping")
let sections = ["Fish_(New_Horizons)", "Bugs_(New_Horizons)"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let promises = [];
sections.forEach((section, index) => {
    promises.push(axios.get(`https://animalcrossing.fandom.com/wiki/${section}`))
});

axios.all(promises)
    .then((data) => {
        data.forEach((res, x) => {
            let result = {};
            var $ = cheerio.load(res.data);
            let rows = $("div[title='Northern Hemisphere'] table table tr");
            rows.each((i, row) => {
                if (i === 0) {
                    return;
                }
                result.name = $(row).find("td").eq(0).text().trim();
                result.price = $(row).find("td").eq(2).text().trim();
                result.location = $(row).find("td").eq(3).text().trim();
                if (x === 0) {
                    result.time = $(row).find("td").eq(5).text().trim();
                } else {
                    result.time = $(row).find("td").eq(4).text().trim();
                }
                result.months = [];
                let available = $(row).find("td:nth-last-child(-n+12)");
                available.each((i, ele) => {
                    if ($(ele).text().trim() === "-") {
                        result.months.push("")
                    }
                    else
                        result.months.push(months[i])
                })
                switch (x) {
                    case 0:
                        db.Fish.findOneAndUpdate({ name: result.name }, result, { new: true, upsert: true })
                            .then(() => {
                                if (i === rows.length - 1 && data.length - 1 === x)
                                    runExit();
                            })
                        break;
                    case 1:
                        db.Bugs.findOneAndUpdate({ name: result.name }, result, { new: true, upsert: true })
                            .then(() => {
                                if (i === rows.length - 1 && data.length - 1 === x)
                                    runExit();
                            })
                        break;
                    default:
                        break;
                }
            })
        })
    });

runExit = () => {
    console.log("Scraping complete!")
    process.exit();
}