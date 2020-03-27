var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var FossilSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
});

// This creates our model from the above schema, using mongoose's model method
var Fossil = mongoose.model("Fossil", FossilSchema, "Fossil");

module.exports = Fossil;