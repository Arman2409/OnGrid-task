import logger from '../tools/logger.js';

async function logOut(req, res) {
    if (req.session.user){
       delete req.session.user;
       res.status(200).send('Logged Out');
    } else {
        logger.error('Logging Out But Not Logged In');
        res.status(500).send('Not Logged In');
    }
}

export default logOut;