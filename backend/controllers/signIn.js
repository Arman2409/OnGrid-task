import bcrypt from 'bcrypt';

import UserModel from "../../models/User.js";
import logger from '../tools/logger.js';

async function logIn ( req,res) {
    const {email, password} = req.query;
    await UserModel.findOne({email:email}, function (err, cursor) {
      if (err ) logger.error(`${err}`);
      if (cursor) {
            bcrypt.compare(password, cursor.password, (err, response) => {
               if (err) {
                  logger.error(`${e.message}`);
                  res.status(500).end();
               };
               if (response) {
                 req.session.user = cursor;
                 res.status(201).send(cursor);
                 return;
               } else {
                res.status(201).send('Wrong Password');
               }
            })
         } else {
            res.status(201).send('User Not Found');
            return;
         }
     }).clone().catch(function(err){ 
        logger.error(err);
        res.status(500).end();
    });
}

export default logIn;