import express from 'express';

import { getHomePage } from '../controllers/webpage';

export default (router: express.Router) => {
  router.get('/home', getHomePage);
};