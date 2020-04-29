const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const team = [
  {
    id: 1,
    name: "Johannes",
    hobby: "Play football",
    age: 27,
  },
  {
    id: 2,
    name: "Emil",
    hobby: "Hangout with friends",
    age: 18,
  },
  {
    id: 3,
    name: "Kalle",
    hobby: "Watch movies",
    age: 23,
  },
  {
    id: 4,
    name: "Rasmus",
    hobby: "Play games",
    age: 15,
  },
  {
    id: 5,
    name: "Tim",
    hobby: "Love programming",
    age: 22,
  },
];

app.get("/team", (req, res) => {
  res.send(team);
});

app.get("/team/:id", async (req, res) => {
  const teamMembers = await team.find(
    (id) => id.id === parseInt(req.params.id)
  );
  if (!teamMembers) return res.status(404).send("Inserted ID doesnt exist");
  res.send(teamMembers);
});

app.post("/team", (req, res) => {
  if (!req.body.name || !req.body.hobby || !req.body.age) {
    return res.status(404).send("Name, hobby and age are required");
  } else {
    const newTeamMember = {
      id: team.length + 1,
      name: req.body.name,
      hobby: req.body.hobby,
      age: req.body.age,
    };
    team.push(newTeamMember);
    res.send(`A new team-member is added with ID of ${parseInt(team.length)}`);
  }
});

app.put("/team/:id", (req, res) => {
  const teamMembers = team.find((id) => id.id === parseInt(req.params.id));
  if (!teamMembers) return res.status(404).send("Inserted ID doesnt exist");

  teamMembers.name = req.body.name;
  teamMembers.hobby = req.body.hobby;
  teamMembers.age = req.body.age;
  res.send(`You updated the team-member of id: ${parseInt(req.params.id)}`);
});

app.delete("/team/:id", (req, res) => {
  const teamMembers = team.find((id) => id.id === parseInt(req.params.id));
  if (!teamMembers) return res.status(404).send("Inserted ID doesnt exist");

  const index = team.indexOf(teamMembers);
  team.splice(index, 1);
  res.send(`You removed team-member with ID of ${parseInt(req.params.id)}`);
});

app.listen(3000, () => console.log("The server is running"));
