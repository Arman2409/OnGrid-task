import logger from "../tools/logger.js";

async function authenticate (req, res) {
    if (req.session.user) {
      logger.info('Authenticated')
      res.status(200).send(req.session.user);
      res.end();
    } else {
      logger.info('Not authenticated');
      res.status(200).send('Not Authenticated')
      res.end();
    };
};

export default authenticate;