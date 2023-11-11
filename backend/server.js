//set up an express server
const express = require("express");
const app = express();
const port = 5001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/hello", (req, res) => {
  res.json({ message: "Hello " + req.body.name });
});

const ocrRouter = require("./ocr");
app.use("/ocr", ocrRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
