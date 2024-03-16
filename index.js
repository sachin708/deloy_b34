
const express = require("express");
const connection = require("./config/db");
const { userroute } = require("./routers/userrouter");
const { noterouter } = require("./routers/note.routes");
require("dotenv").config();
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userroute);
app.use("/note", noterouter);

app.listen(process.env.PORT, async()=>{
    
    try{
        await connection
        console.log(`server is running ${process.env.PORT}`);
        console.log("connecting the DB")
    }catch(err){
        console.log(err);
    }
})