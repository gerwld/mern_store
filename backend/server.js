import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";
import path from "path";

dotenv.config();

const PORT = (process.env.PORT || 5000);
    
const app = express();

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept json data in req

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/frontend/dist")))  

   app.get("*", (_,res) => {
      res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
   })
}

app.listen(PORT, () => {
   connectDB();
   console.log('Server started on http://localhost:' + PORT);
});
