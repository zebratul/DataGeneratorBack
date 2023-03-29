const express = require("express");
const router = express.Router();
const { CorruptDataGenerator, generateData } = require('../utils');

router.get("/", (req, res) => {
    const { locale, seed, page, corruptionLevel } = req.query;
    console.log("received a query");
    console.log("chosen locale:", locale);
    console.log("chosen seed:", seed);
    console.log("chosen page:", page);
    console.log("chosen corruption level:", corruptionLevel);
    const pageSeed = seed + page;
    const data = generateData(locale, pageSeed, page, corruptionLevel);
    res.json(data);
});

module.exports = router;