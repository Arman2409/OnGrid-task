import logger from '../tools/logger.js';

async function logOut(req, res) {
    if (req.session.user){
       delete req.session.cookie.user;
       res.status(200).send('Loged out');
       res.end();
    } else {
        logger.error('Logging out but cookies not present');
        res.status(500).send('Not logged in');
        res.end();
    }
}

export default logOut;