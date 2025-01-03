const dotenv = require("dotenv");
const connectDB = require("../src/config/db");
const app = require("../src/app");

dotenv.config();

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "backend running successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
