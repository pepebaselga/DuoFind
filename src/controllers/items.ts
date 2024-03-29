import express from 'express';

import { getItems, createItem } from '../db/items';

export const getAllItems = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getItems();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const postItem = async (req: express.Request, res: express.Response) => {
  try {
    const users = await createItem(req.body);
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

