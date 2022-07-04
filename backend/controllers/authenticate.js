
async function authenticate (req, res) {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(200).send('Not Authenticated');
    };
};

export default authenticate;