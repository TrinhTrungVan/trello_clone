import express, { Router } from "express";
import cors from "cors";
import route from "./routes/index.js";
import connectDB from "./database/index.js";

//Connect to Database
connectDB();

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

route(app);

app.listen(1904);
