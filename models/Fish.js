var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var FishSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    months: {
        type: Array,
        required: true
    }
});

// This creates our model from the above schema, using mongoose's model method
var Fish = mongoose.model("Fish", FishSchema, "Fish");

module.exports = Fish;