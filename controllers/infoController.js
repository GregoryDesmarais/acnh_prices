const Bugs = require("../models/Bugs");
const Fish = require("../models/Fish");


module.exports = {

    getAll: function (req, res) {
        Fish.find().sort({ name: "asc" })
            .then((data, err) => {
                if (err)
                    console.log(err);
                if (data) {
                    Bugs.find().sort({ name: "asc" })
                        .then((data2, err) => {
                            if (err)
                                console.log(err);
                            let info = data.concat(data2);
                            res.send(info);
                        })
                }
            })
    },
    getFish: function (req, res) {
        Fish.find().sort({ name: "asc" })
            .then((data, err) => {
                if (err)
                    console.log(err);
                if (data) {
                    res.send(data)
                }
            })
    },
    getBugs: function (req, res) {
        Bugs.find().sort({ name: "asc" })
            .then((data, err) => {
                if (err)
                    console.log(err);
                if (data) {
                    res.send(data)
                }
            })
    }
}