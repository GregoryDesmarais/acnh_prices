const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const cron = require("node-cron");
const { exec } = require('child_process');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newHorizon";

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

console.log("Adding cron job for scraping");
cron.schedule("* */6 * * *", () => {
    const scrape = exec('node scripts/scrape.js', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: ' + error.code);
            console.log('Signal received: ' + error.signal);
        }
    });
    scrape.on('exit', function (code) {
        console.log('Child process exited with exit code '+code);
    })
})

// Start the API server
app.listen(PORT, "0.0.0.0", function () {
    console.log(`API Server now listening on PORT ${PORT}!`);
});
