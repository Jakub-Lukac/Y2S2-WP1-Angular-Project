import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// GET request to fetch favorite movies
router.get("/", async (req, res) => {
  let collection = await db.collection("favorite-tracks");
  let results = await collection.find({}).toArray();
  res.status(200).send(results);
});

export default router;
