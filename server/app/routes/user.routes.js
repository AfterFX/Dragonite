const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const { tutorials } = require("../controllers");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/all", controller.allAccess);

  app.get(
    "/api/user/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/user/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/user/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put(
    "/api/user/changeUsername/",
    [authJwt.verifyToken],
    controller.changeNickname
  );




  // Create a new Tutorial
  app.post("/api/tutorials/",
    [authJwt.verifyToken],
    tutorials.create
  );

  // Retrieve all Tutorials
  app.get("/api/tutorials/",
    [authJwt.verifyToken],
    tutorials.findAll
  );

  // Retrieve all published Tutorials
  app.get("/api/tutorials/published",
    [authJwt.verifyToken],
    tutorials.findAllPublished
  );

  // Retrieve a single Tutorial with id
  app.get("/api/tutorials/:id",
    [authJwt.verifyToken],
    tutorials.findOne
  );

  // Update a Tutorial with id
  app.put("/api/tutorials/:id",
    [authJwt.verifyToken],
    tutorials.update
  );

  // Delete a Tutorial with id
  app.delete("/api/tutorials/:id",
    [authJwt.verifyToken],
    tutorials.delete
  );

  // Delete all Tutorials
  app.delete("/api/tutorials/",
    [authJwt.verifyToken],
    tutorials.deleteAll
  );

};
