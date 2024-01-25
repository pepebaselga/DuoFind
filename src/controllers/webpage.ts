import express from 'express';
import path from 'path';
export const getHomePage = async (req: express.Request, res: express.Response) => {
    try {
        return res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
    //   return res.sendFile('index.html', {root: './public'});
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  