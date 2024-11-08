const express = require("express");
const { User, Show } = require("../../models");
const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
    const allUsers = await User.findAll()
    res.json(allUsers)
})

// Get one user by id
router.get("/users/:id", async (req, res) => {
    const oneUser = await User.findByPk(req.params.id)
    res.json(oneUser)
})

// Get users watched shows
router.get("/users/:id/shows", async (req,res) => {
    const id = req.params.id; // Extract id 
    const show = await Show.findByPk(id, { include: User });
    res.json(show.users)
})

// Associate a user with a show they've watched
router.put("/users/:userId/shows/:showId", async (req, res) => {
    const { userId, showId } = req.params;

    // Find the user by userId and show by showId, then associate them
    const user = await User.findByPk(userId);
    const show = await Show.findByPk(showId);
    await user.addShow(show);

    // Send success response
    res.status(200).json({ message: `User ${userId} is now associated with show ${showId}` });
});

module.exports = router