const express = require("express");
const router = express.Router();
const nobelController = require("../controllers/nobelController.js");
router.route("/api/nobel")
    .get(nobelController.showAll)
    .post(nobelController.addNobel);
router.route("/api/nobel/:nobelID")
    .delete(nobelController.removeNobel)
    .get(nobelController.showOne)
    .put(nobelController.fullyUpdateNobel)
    .patch(nobelController.partiallyUpdateNobel);
router.route("/api/search/:countryOfBirth")
    .get(nobelController.findByCountryOfBirth);
module.exports = router;