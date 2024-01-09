import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
};