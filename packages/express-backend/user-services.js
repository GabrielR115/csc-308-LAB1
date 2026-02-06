import mongoose from "mongoose";
import userModel from "./user";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

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


function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}


function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}


export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  deleteUserById,
};