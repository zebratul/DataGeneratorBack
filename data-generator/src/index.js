require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dataRouter = require("./routes/data");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/data", dataRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Server error" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server (index.js) listening on port ${port}`);
});