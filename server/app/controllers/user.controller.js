const db = require("../models");
const Users = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.changeNickname = (req, res) => {
  const id = req.userId;
  Users.update(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Nickname was updated successfully.",
            type: "success"
          });
        } else {
          res.send({
            message: `Cannot update nickname with  user id=${id}. Maybe user was not found or req.body is empty!`,
            type: `error`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating nickname with user id=" + id,
          type: `error`
        });
      });
};
