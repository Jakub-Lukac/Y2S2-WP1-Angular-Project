import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import favoriteTracks from "./routes/favorite-tracks.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/favorite-tracks", favoriteTracks);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
