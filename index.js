import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Connection from './database/db.js';
import routes from './routes/route.js';
import path from "path";


const app = express();

const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', routes);

app.use(express.static(path.join(__dirname,"./client/build")))
app.get('*', (_,res) => {
    res.sendFile(path.join(__dirname,"./client/build/index.html"),(err) => {
        res.status(500).send(err);
    })
})

const PORT = process.env.PORT || 8000;

Connection();

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
    const path = require("path")
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}