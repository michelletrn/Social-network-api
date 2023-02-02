const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomName, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = getRandomName().trim();
    const thoughts = getRandomThoughts(4);
    const email = `${username}${Math.floor(Math.random() * 50 + 1)}@email.com`;
    users.push({
      username,
      thoughts,
      email,
    });
  }
  const newUser = await User.insertMany(users);
  console.log("newUser: ", newUser);

  console.table(users);
  console.info("Seeding complete!");
  process.exit(0);
});
