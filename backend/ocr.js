const express = require("express");
const router = express.Router();
const { ocrSpace } = require('ocr-space-api-wrapper');

router.post("/", async (req, res) => {
    const ocrRes = await ocrSpace(req.body.url, {
        apikey: "9befe38f8f88957",
        OCREngine: 2,
        isTable: true
    });
    res.json({ text: ocrRes["ParsedResults"][0]["ParsedText"] });
});

module.exports = router;