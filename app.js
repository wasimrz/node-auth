const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const app = express();
const loadash = require("lodash");
const capitalize = loadash.capitalize;
const dotenv = require('dotenv');
dotenv.config();
const obj = { name: "wasi reza Hello" };
const str = obj.name;

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "img/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const titleCase = (str) => map(str.split(" "), capitalize).join(" ");
console.log(titleCase);

const feedRoutes = require("./routes/feed");
const authRoutes = require("./routes/auth");

app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
});
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose
    .connect(
        process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((result) => {
        app.listen(8080);
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    });