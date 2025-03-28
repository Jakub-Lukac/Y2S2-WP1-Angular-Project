import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// GET request to fetch favorite movies
router.get("/", async (req, res) => {
  let collection = await db.collection("favorite-tracks");
  let results = await collection.find({}).toArray();
  res.status(200).send(results);
});

// POST request to add a track to favorites
router.post("/", async (req, res) => {
  const { id, name, duration_ms, track_number, albumImageUrl } = req.body;

  if (!id || !name) {
    return res
      .status(400)
      .json({ error: "Track ID and Track Name are required." });
  }

  const collection = await db.collection("favorite-tracks");

  const existingTrack = await collection.findOne({ id });
  if (existingTrack) {
    return res.status(409).json({ error: "Track is already in favorites." });
  }

  const favoriteTrack = {
    id,
    name,
    duration_ms,
    track_number,
    albumImageUrl,
  };

  let result = await collection.insertOne(favoriteTrack);
  res.status(201).json({ message: "Track added to favorites!", data: result });
});

export default router;
