import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/api/ai", aiRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.listen(5000, ()=>{
 console.log("Server running on port 5000");
});