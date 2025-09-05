
const express = require('express');

const userRouter = express.Router();
const {getAllUsers , addUser , getUser ,  updateUser , deleteUser } = require('../controllers/userController')




userRouter
.route('/')
.get(getAllUsers)
.post(addUser);

userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = userRouter;