const names = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Abaan",
  "Abbas",
  "Abdallah",
  "Abdalroof",
  "Smith",
  "Jones",
  "Coollastname",
  "enter_name_here",
  "Ze",
  "Zechariah",
  "Zeek",
  "Zeeshan",
  "Zubayr",
  "Zuriel",
  "Xander",
  "Jared",
  "Courtney",
  "Gillian",
  "Clark",
  "Jared",
  "Grace",
  "Kelsey",
  "Tamar",
  "Alex",
  "Mark",
  "Tamar",
  "Farish",
  "Sarah",
  "Nathaniel",
  "Parker",
];

const thoughts = [
  "cool",
  "nice",
  "awesome",
  "good",
  "great job",
  "nice work",
  "hope you feel better",
  "happy for you",
  "why would you say that",
  "that was mean",
  "i apologize",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  `${getRandomArrItem(names)}${getRandomArrItem(names)}`;

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
    });
  }
  return results;
};

module.exports = { getRandomName, getRandomThoughts };
