var express = require('express');
const Ticket = require('../controllers').ticket;

module.exports = (app) => {
	app.get('/ticket', Ticket.all);
	// router.post('/ticket', Ticket.add);
	app.post('/ticket-validate', Ticket.validate);
	app.get('/counting', Ticket.counting);
	app.get('/decrease', Ticket.decrease);
}