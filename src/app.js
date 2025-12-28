import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors({
 origin: [
    "https://meta-genomics.vercel.app",
    "https://localhost:5173",
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h2 style="
      color: red;
      font-size: 40px;
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #ffe6e6;
      padding: 15px;
      border: 2px solid red;
      border-radius: 8px;
    ">
      Testing On ..... Keeping your server live....
    </h2>
  `);
});


export default app;