const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  getUsers(req, res) {
    console.log("Request to GET all users");
    User.find({})
      .then((users) => {
        console.log(users);
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  createUser(req, res) {
    console.log("Request to POST new user");
    User.create(req.body)
      .then((user) => {
        res.json(user), console.log(`New user ${user} created`);
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  },

  getSingleUser(req, res) {
    console.log("Request to GET single user");
    User.findOne({ _id: req.params.userId })
      // .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteUser(req, res) {
    console.log("Request to DELETE user");
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Please enter a valid ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: `User ${req.params.userId} deleted` }));
  },
  updateUser(req, res) {
    console.log("Request to UPDATE a user");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "Please enter a valid ID" })
        : res.json({
            user,
          })
    );
  },
  addFriend(req, res) {
    console.log("Request to add friend");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "Please enter a valid ID" })
        : res.json(user)
    );
  },
  deleteFriend(req, res) {
    console.log("Request to delete friend");
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    ).then((user) =>
      !user ? res.json({ message: "Error in deleting friend" }) : res.json(user)
    );
  },
};
