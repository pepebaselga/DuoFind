import express from 'express';
import { getAllItems, postItem } from '../controllers/items';
import {checkJwt} from '../index'

export default (router: express.Router) => {
  router.get('/items', checkJwt, getAllItems);
  router.post('/items', checkJwt,  postItem)
};