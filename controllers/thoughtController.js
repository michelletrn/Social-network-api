const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

module.exports = {
  getThoughts(req, res) {
    console.log("Request to GET all thoughts");
    Thought.find({})
      .then((thought) => {
        console.log(thought);
        return res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleThought(req, res) {
    console.log("Request to GET single thought");
    Thought.find({ _id: req.params.thoughtId })
    //   .select("-__v") what does this even do??
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "Cannot find thought with that ID" })
          : res.json(thought)
      );
  },
  createThought(req, res) {
    console.log("Request to POST thought");
    Thought.create(req.body)
      .then((thought) => {
        if (!thought) {
          return res.json({ message: "Please enter thought!" });
        }
        User.findOne({ username: req.body.username }, (err, user) => {
          if (err) {
            console.log(err);
            return res.json(err);
          }
          user.thoughts.push(thought);
          user.save((error) => {
            if (error) {
              console.log(error);
              return res.json(error);
            }
            res.json(thought);
            console.log("new thought created");
          });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.json(err);
      });
  },
  //   createThought(req, res) {
  //     console.log("Request to POST thought");
  //     Thought.create(req.body)
  //       .then((thought) => {
  //         console.log(thought),
  //           !thought
  //             ? res.json({ message: "Please enter thought!" })
  //             : // creating thought but not pushing to user
  //               User.findOne({ username: req.body.username })
  //                 .thoughts.push(thought)
  //                 .then(res.json(thought), console.log(`new thought created`));

  //         // User.aggregate([
  //         //   { _id: { $match: { username: req.body.username } } },
  //         //   { $push: { thoughts: req.body } }
  //         // ]).then(res.json(thought), console.log(`new thought created`));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return res.json(err);
  //       });
  //   },
  updateThought(req, res) {
    console.log("Request to UPDATE thought");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    ).then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: `Thought ${req.params.thoughtId} not found!` })
        : res.json(thought)
    );
  },
  deleteThought(req, res) {
    console.log("Request to DELETE thought");
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: `Thought ${req.params.thoughtId} not found` })
        : res.json({ message: `Thought ${req.params.thoughtId} deleted` })
    );
  },
  postReaction(req, res) {
    console.log("Request to POST reaction");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    ).then((thought) => {
      !thought
        ? res.json({ message: "Cannot locate thought for reaction" })
        : res.json(thought);
    });
  },
  deleteReaction(req, res) {
    console.log("Request to DELETE reaction");
    // why does it not work with findOneAndDelete
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    ).then((thought) => {
      !thought
        ? res.json({ message: "Cannot locate thought" })
        : res.json(thought);
    });
  },
};
