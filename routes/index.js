var express = require('express');
var router = express.Router();
const Ticket = require('../controllers').ticket;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/ticket', Ticket.all);
// router.post('/ticket', Ticket.add);
router.post('/ticket-validate', Ticket.validate);

module.exports = router;
