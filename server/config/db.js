import { config } from "dotenv";
import mongoose from "mongoose";

config();
const uri = process.env.MONGODB;


async function connectDb() {
    await mongoose.connect(uri).then(()=>console.log("DB Connected")).catch(err=>{
        console.log(err)
    })
}
export default connectDb 