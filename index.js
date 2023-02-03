import express, { response } from 'express';

import mongoose from 'mongoose';

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from './validations.js';

import ckeckAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import checkAuth from './utils/checkAuth.js';
import UserModel from './models/User.js';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.llbjemp.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('DB OK'))
  .catch(err => console.log('DB ERROR', err));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', ckeckAuth, UserController.getMe);

// app.get('/posts', PostController.getAll);
// app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
// app.delete('/posts', PostController.remove);
// app.patch('/posts', PostController.update);
app.listen(4444, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});
