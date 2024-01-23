import express from 'express';

import { getItems } from '../db/users';

export const getAllItems = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getItems();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
