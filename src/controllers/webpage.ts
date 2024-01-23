import express from 'express';

export const getHomePage = async (req: express.Request, res: express.Response) => {
    try {
      return res.sendFile('index.html', {root: './public'});
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  