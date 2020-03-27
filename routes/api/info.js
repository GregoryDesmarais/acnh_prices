const router = require("express").Router();
const infoController = require("../../controllers/infoController");

router.route("/getFish")
    .get(infoController.getFish);


router.route("/getBugs")
    .get(infoController.getBugs);

router.route("/getAll")
    .get(infoController.getAll);

module.exports = router;
