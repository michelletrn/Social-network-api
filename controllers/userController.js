const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const friendCount = async (userID) =>
  User.aggregate([
    { $match: { _id: ObjectId(userID) } },
    { $unwind: "$friends" },
  ])
    .count("friendCount")
    .then((friends) => friends);

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json({
              user,
              friendCount: await friendCount(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
