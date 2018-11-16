const Ticket = require('../models').ticket;
const Dashboard = require('../models').dashboard;

module.exports = {
	all(req, res) {
		return Ticket.findAll()
		.then((tickets) => {
			res.status(200).send({
				status: true,
				message: 'Managed to retrieve all ticket data.',
				data: tickets
			})
		})
		.catch((err) => {
			res.status(400).send({
				status: false,
				message: err.original.sqlMessage
			})
		})
	},

	counting(req, res) {
		return Dashboard.findOne({
			where: {
				id: 1
			}
		})
		.then((dashboard) => {
			if(!dashboard) {
				return res.status(400).send({
					status: false,
					message: 'Counter not found.'
				})
			}

			return dashboard.updateAttributes({
				count: dashboard.count + 1
			})
			.then(() => {
	            return res.status(200).send({
					status: true,
					message: 'Counter success.',
					data: dashboard.count
				})
			})
			.catch((err) => {
				res.status(400).send({
					status: false,
					message: err.original.sqlMessage
				})
			})
		})
		.catch((err) => {
			res.status(400).send({
				status: false,
				message: err.original.sqlMessage
			})
		})
	},

	decrease(req, res) {
		return Dashboard.findOne({
			where: {
				id: 1
			}
		})
		.then((dashboard) => {
			if(!dashboard) {
				return res.status(400).send({
					status: false,
					message: 'Counter not found.'
				})
			}

			return dashboard.updateAttributes({
				count: dashboard.count - 1
			})
			.then(() => {
	            return res.status(200).send({
					status: true,
					message: 'Counter success.',
					data: dashboard.count
				})
			})
			.catch((err) => {
				res.status(400).send({
					status: false,
					message: err.original.sqlMessage
				})
			})
		})
		.catch((err) => {
			res.status(400).send({
				status: false,
				message: err.original.sqlMessage
			})
		})
	},

	add(req, res) {
		let promises = [];

		for (var i = 822201; i < 834450; i++) {
			promises.push(Ticket.create({
				code: i,
				status: 0
			}))
		}
		
		return Promise.all(promises).then(() => {
			res.status(201).send({
				status: true,
				message: 'Managed to generate all ticket data.'
			})
		})
	},

	validate(req, res) {
		return Ticket.findOne({
			where: {
				code: req.body.code
			}
		})
		.then((ticket) => {
			if(!ticket) {
				return res.status(400).send({
					status: false,
					message: 'Validate failed.'
				})
			}

			return ticket.updateAttributes({
				status: 1
			})
			.then(() => {
				res.status(200).send({
					status: true,
					message: 'Validate success.'
				})
			})
			.catch((err) => {
				res.status(400).send({
					status: false,
					message: err.original.sqlMessage
				})
			})
		})
		.catch((err) => {
			res.status(400).send({
				status: false,
				message: err.original.sqlMessage
			})
		})
	}
}