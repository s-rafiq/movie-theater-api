const express = require("express");
const { User, Show } = require("../../models");
const router = express.Router();

// Get all shows
router.get("/shows", async (req, res) => {
    const allShows = await Show.findAll()
    res.json(allShows)
})

// Get one show
router.get("/shows/:id", async (req, res) => {
    const oneShow = await Show.findByPk(req.params.id)
    res.json(oneShow)
})

// Get shows watched by users
router.get("/shows/:id/users", async (req,res) => {
    const id = req.params.id; // Extract id 
    const user = await User.findByPk(id, { include: Show })
    res.json(user.shows)
})

router.put("/shows/:id/available", async (req, res) => {
    const id = req.params.id; // Extract id from request parameters


        // Find the show by its ID
        const show = await Show.findByPk(id);

        // Ensure the 'available' value is checked explicitly
        let newAvailableStatus;
        if (show.available === true) {
            newAvailableStatus = false // Set to unavailable
        } else {
            newAvailableStatus = true // Set to available
        }

        // Update the 'available' property in the database
        await Show.update({ available: newAvailableStatus }, { where: { id } })

        // Send response with the updated status
        res.status(200).json({ message: "Show availability updated", available: newAvailableStatus })
    
});

router.delete("/shows/:id", async (req, res) => {
    const id = req.params.id
    const deletedShow = await Show.findByPk(id)
    if (!deletedShow) {
        return res.status(404).json({ message: "Show not found" });
    }
    await deletedShow.destroy()
    res.status(200).json({ message: "Show deleted successfully", deletedShow })
})

router.get("/shows/genre/:genre", async (req, res) => {
    const genre = req.params.genre;  // Get genre from URL params
    console.log("Genre received: ", genre);  // Check if genre is being passed correctly
    const shows = await Show.findAll({
        where: { genre: genre }
    });
    res.json(shows);  // Return shows in JSON format
});




module.exports = router
