import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import productRecordRoutes from "./routes/productRecordRoutes.js";
import saleRoutes from "./routes/saleRoutes.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(imageRoutes);
app.use(productRecordRoutes);
app.use(saleRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "online",
        message: `Server running on port ${PORT} (˶>⩊<˶)`,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ₍^. .^₎⟆`);
});
