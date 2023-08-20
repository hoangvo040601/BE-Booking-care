import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRouter from "./route/web"
import * as dotenv from 'dotenv'
import conectDb from "./config/conectDb";

dotenv.config();



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

configViewEngine(app);
initWebRouter(app);
conectDb();

let port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log("start server succeed!", port)
})