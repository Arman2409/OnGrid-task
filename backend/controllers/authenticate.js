import logger from "../tools/logger.js";

async function authenticate (req, res) {
    if (req.session.cookie.user) {
      res.status(200).send(req.session.cookie.user);
      res.end();
    } else {
      logger.error('Not authenticated');
      res.status(200).end();
    };
};

export default authenticate;