import express from 'express';

import items from './items';

import webpage from './webpage' 

const router = express.Router();

export default (): express.Router => {
  webpage(router)
  items(router);
  return router;
};