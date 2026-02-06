import userServices from "./user-services.js";
import express from "express";
import cors from "cors";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    userServices.findUserByNameAndJob(name, job)
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));
  } else if (name !== undefined) {
    userServices.findUserByName(name)
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));
  } else if (job !== undefined) {
    userServices.findUserByJob(job)
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));
  } else {
    userServices.getUsers()
      .then(result => res.send({ users_list: result }))
      .catch(error => res.status(500).send(error));
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices.findUserById(id)
    .then((result) => {
      if (result === undefined || result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
    .then((savedUser) => {
      res.status(201).send(savedUser);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];

  userServices.deleteUserById(id)
    .then(result => {
      if (!result) {
        res.status(404).send("404 not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch(error => {
      res.status(500).send(error);
    });
});
