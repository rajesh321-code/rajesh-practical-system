import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/database.js";
import router from "../routes/FeedbackRoutes.js";

const app = express();

const PORT = 9000 || process.env.PORT;

app.use(express.json());


app.use("/api/v1",router)

app.get("/",(req,res)=> {
  res.send("Rajesh create practical system");
}
);
dotenv.config();

dbConnect();



app.listen(PORT, () => {
  console.log("Server is running at port:", PORT);
});
