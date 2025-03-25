import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

// POST request to add a track to favorites
router.post("/:albumName", async (req, res) => {
  const albumName = req.params.albumName;
  const { trackId, trackName, duration, trackNumber } = req.body;

  if (!trackId || !trackName) {
    return res
      .status(400)
      .json({ error: "Track ID and Track Name are required." });
  }

  const collection = await db.collection("favorite-tracks");

  const existingTrack = await collection.findOne({ trackId });
  if (existingTrack) {
    return res.status(409).json({ error: "Track is already in favorites." });
  }

  const favoriteTrack = {
    trackId,
    trackName,
    albumName,
    trackNumber,
    duration,
    addedAt: new Date(),
  };

  let result = await collection.insertOne(favoriteTrack);
  res.status(201).json({ message: "Track added to favorites!", data: result });
});

export default router;
