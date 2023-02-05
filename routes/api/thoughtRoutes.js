const router = require("express").Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    postReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// '/api/thoughts'
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).post(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionsId').delete(deleteReaction);

router.route("/:thoughtId/reactions/").post(postReaction);

module.exports = router;
