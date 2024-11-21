import express from "express";
import connectDb from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import ImageKit from "imagekit";
import {config} from "dotenv";

const app = express();
config();

app.use(express.json()).use(bodyParser.json()).use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Nan than da leo dass</h1>");
});

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_URI,
  publicKey: process.env.IMAGEKIT_PUB,
  privateKey: process.env.IMAGEKIT_PRI,
});

app.get("/img/upload", (req, res) => {
    try{
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    }catch(e){
        res.send({
            ok:false,
            message:"Something Went Wrong",
            error:e
        })
    }
});

app.delete("/img/delete/:fileId",(req,res)=>{
  const id = req.params.fileId
  imagekit.deleteFile(id, (error, result) => {
    if (error) {
        res.status(400).send("File Not deleted Successfully")
    } else {
        res.status(200).json({ message: 'File deleted successfully',result });
    }
});
})

app
  .use("/user", userRoutes)
  .use("/chat", chatRoutes)
  .use("/images", express.static("uploads"));

console.log(process.env.PORT);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Running");
  connectDb();
});
