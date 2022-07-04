import bcrypt from 'bcrypt';

import UserModel from "../../models/User.js";
import logger from '../tools/logger.js';

async function logIn ( req,res) {
    const {email, password} = req.query;
    console.log(req.query);
    console.log(email);
    await UserModel.findOne({email:email}, function (err, cursor) {
       if (err ) logger.error(`${err}`);
      if (cursor) {
            bcrypt.compare(password, cursor.password, (err, response) => {
               if (err) console.log(err);
               if (response) {
                 req.session.user = cursor;
                 res.status(201).send(cursor);
                 res.end();
                 return;
               } else {
                res.status(201).send('Wrong Password');
                res.end();
               }
            })
         } else {
            res.status(201).send('User Not Found')
            res.end();
            return;
         }
     }).clone().catch(function(err){ 
        logger.error(err);
        res.status(500).end();
    });
}

export default logIn;