const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');


// '/api/users/'
router.route('/').get(getUsers).post(createUser);

// '/api/users/:userID'
router.route('/:userId').get(getSingleUser).delete(deleteUser).post(updateUser);

// '/api/users/:userID/friends/:friendId'
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;