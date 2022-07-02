import logger from "../tools/logger.js";

async function authenticate (req, res) {
   if (req.session.cookie.isAuthenticated) {
    if (req.session.cookie.user) {
      res.status(200).send(req.session.cookie.user);
      res.end();
    } else {
      logger.error('Authenticated, but user not present');
      res.status(500);
    };
   };
};

export default authenticate;