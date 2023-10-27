require("dotenv").config();
import * as express from 'express';
import { AppDataSource } from "./data-source"
const routes = require("./routes");
const cors = require("cors");
const app = express();
AppDataSource.initialize()
app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(process.env.PORT);
