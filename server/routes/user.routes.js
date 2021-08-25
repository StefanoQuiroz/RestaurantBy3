const {findUser, findSingleUser, createUser, updateUser, deleteUser, login, logOut} = require("../controllers/user.controller");
const {authenticate} = require("../config/jwt.config");
const express = require("express");
const router = express();


router.get("/users", authenticate, findUser);
router.get("/users/:id", authenticate, findSingleUser);
router.post("/users/new", createUser);
router.put("/users/update/:id", authenticate, updateUser);
router.delete("/users/delete/:id", authenticate, deleteUser);

router.post("/login", login);
router.get("/logout", authenticate, logOut);
module.exports = router; 

/* router.get("/users", findUser);
router.get("/user/:id", findSingleUser);
router.post("/user/new", createUser);
router.put("/users/update/:id", updateUser);
router.delete("/users/delete/:id", deleteUser); */