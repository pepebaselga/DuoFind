import express from 'express';

import { getAllItems } from '../controllers/items';

export default (router: express.Router) => {
  router.get('/items', getAllItems);
};