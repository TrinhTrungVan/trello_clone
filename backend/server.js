import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/index.js";
import connectDB from "./database/index.js";

// const HARD_DATA = [
//     {
//         _id: "62e3ab986a79c0b854119842",
//         name: "Learn HTML",
//         __v: 0,
//     },
//     {
//         _id: "62e3ab9e6a79c0b854119845",
//         name: "Learn CSS",
//         __v: 0,
//     },
//     {
//         _id: "62e3abb06a79c0b854119848",
//         name: "Learn JavaScript",
//         __v: 0,
//     },
//     {
//         _id: "62e3abb96a79c0b85411984b",
//         name: "Learn ReactJS",
//         __v: 0,
//     },
//     {
//         _id: "62e3abc06a79c0b85411984e",
//         name: "Learn ThreeJS",
//         __v: 0,
//     },
//     {
//         _id: "62e3abc96a79c0b854119851",
//         name: "Learn NextJS",
//         __v: 0,
//     },
//     {
//         _id: "62e3abf66a79c0b854119884",
//         name: "Learn NodeJS",
//         __v: 0,
//     },
//     {
//         _id: "62e3abfe6a79c0b854119887",
//         name: "Learn ExpressJS",
//         __v: 0,
//     },
//     {
//         _id: "62e3ac086a79c0b85411988a",
//         name: "Learn SpringBoot",
//         __v: 0,
//     },
//     {
//         _id: "62e3ac0f6a79c0b85411988d",
//         name: "Learn MongoDB",
//         __v: 0,
//     },
//     {
//         _id: "62e3ac176a79c0b854119890",
//         name: "Learn MySQL",
//         __v: 0,
//     },
//     {
//         _id: "62e3ac346a79c0b854119893",
//         name: "Learn PostgreSQL",
//         __v: 0,
//     },
//     {
//         _id: "62e3ac496a79c0b85411989e",
//         name: "Learn React Native",
//         __v: 0,
//     },
//     {
//         _id: "62e3ac506a79c0b8541198a1",
//         name: "Learn Flutter",
//         __v: 0,
//     },
//     {
//         _id: "62e3acf76a79c0b854119a22",
//         name: "TrungVan",
//         __v: 0,
//     },
//     {
//         _id: "62e3ad786a79c0b854119b41",
//         name: "Learn MongoDB",
//         __v: 0,
//     },
//     {
//         _id: "62e3ad7f6a79c0b854119b44",
//         name: "Learn MySQL",
//         __v: 0,
//     },
//     {
//         _id: "62e3ad9d6a79c0b854119b47",
//         name: "Learn PostgreSQL",
//         __v: 0,
//     },
//     {
//         _id: "62e3ada86a79c0b854119b4a",
//         name: "Learn ReactNative",
//         __v: 0,
//     },
//     {
//         _id: "62e3adb26a79c0b854119b4d",
//         name: "Learn Flutter",
//         __v: 0,
//     },
// ];

dotenv.config();

//Connect to Database
connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

// app.get("/", (req, res) => {
//     res.json(HARD_DATA);
// });

route(app);

app.listen(process.env.PORT);
