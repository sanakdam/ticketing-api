const Ticket = require('../models').ticket;
const Dashboard = require('../models').dashboard;
var QRCode = require('qrcode')

module.exports = {
	all(req, res) {
		return Ticket.findAll()
		.then((tickets) => {
            // for(let ticket of tickets) {
            //     ticket = ticket.toJSON()
            //     QRCode.toFile('barcode-tiket/' + ticket.code + '.png', ticket.code, { errorCorrectionLevel: 'H' }, (err, url) => {
            //         console.log(url)
            //     })
            // }
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

    generate(req, res) {
        let tickets = [
            ["Platinum","Toko Rizky","Kediri","Capai"],
            ["Platinum","Cahyono","Jombang","Capai"], 
            ["Platinum","Slamet Hariyanto","Ngawi","Capai"], 
            ["Platinum","Slamet Jaya","Ponorogo","Potensi"], 
            ["Platinum","Willy Grosir","Malang","Capai"], 
            ["Platinum","Pt. Segoro Putra Mandiri","Malang","Capai"], 
            ["Platinum","Sumber Jaya","Jombang","Capai"], 
            ["Platinum","Pt. Sadar Mandiri Perkasa","Malang","Capai"], 
            ["Platinum","Toko Agung","Jombang","Capai"], 
            ["Platinum","Toko Rejojoyo","Malang","Capai"], 
            ["Platinum","Toko Timur","Blitar","Capai"], 
            ["Platinum","Podo Sehat (Aken)","Jombang","Capai"], 
            ["Platinum","Bravo Swalayan","Jombang","Capai"], 
            ["Platinum","Maya Sari Wijaya","Surabaya","Capai"], 
            ["Gold","Niki Sae","Tulungagung","Potensi"], 
            ["Gold","Vio Jaya","Banyuwangi","Capai"], 
            ["Gold","Lestari Jaya","Malang","Capai"], 
            ["Gold","Cv. Langgeng Gemilang","Jombang","Capai"], 
            ["Gold","Toko Baru Muda","Malang","Potensi"], 
            ["Gold","Toko Roni","Malang","Capai"], 
            ["Gold","Widodo","Malang","Capai"], 
            ["Gold","Sumber Hidup / Cv. Agro Sumber Makmur","Malang","Capai"], 
            ["Gold","Soehandi","Malang","Capai"], 
            ["Gold","Sadar","Malang","Capai"], 
            ["Gold","Toko Kurnia Usaha","Malang","Potensi"], 
            ["Gold","Pt. Mitra Agro Utama","Malang","Capai"], 
            ["Gold","Syabana","Jombang","Capai"], 
            ["Gold","Ferry","Sidoarjo","Potensi"], 
            ["Gold","Samudra Berkah","Malang","Capai"], 
            ["Gold","Toko Lestari","Kediri","Capai"], 
            ["Gold","Toko Vani Vita","Malang","Capai"], 
            ["Gold","Pun Jaya","Jombang","Capai"], 
            ["Gold","Cv. Tiara","Ngawi","Potensi"], 
            ["Gold","Toko Semeru","Malang","Capai"], 
            ["Gold","Toko Anik Ub","Malang","Capai"], 
            ["Gold","Mitra Berkat","Malang","Potensi"], 
            ["Gold","Toko Baru","Malang","Capai"], 
            ["Gold","Adin Putra","Blitar","Capai"], 
            ["Gold","Golden","Kediri","Capai"], 
            ["Gold","Surya Grosir","Ponorogo","Capai"], 
            ["Gold","Sumber Damai","Malang","Capai"], 
            ["Gold","Pitoyo","Malang","Capai"], 
            ["Gold","Sugeng Jaya","Malang","Capai"], 
            ["Gold","Tentrem","Blitar","Capai"], 
            ["Gold","Berkat Melimpah","Sidoarjo","Capai"], 
            ["Gold","Bu Erlida","Blitar","Capai"], 
            ["Gold","Bu Widya","Blitar","Potensi"], 
            ["Gold","Air Mancur","Malang","Capai"], 
            ["Gold","Rudi","Malang","Capai"], 
            ["Gold","Ud. Sumber Bahagia ","Jombang","Capai"], 
            ["Gold","Pojok Sahar","Malang","Capai"], 
            ["Gold","Toko Jaya Usaha / Gatik","Blitar","Capai"], 
            ["Gold","Arto Moro","Jombang","Capai"], 
            ["Gold","Bintang Mas Perkasa","Sidoarjo","Capai"], 
            ["Gold","Kuat","Magetan","Capai"], 
            ["Gold","Santoso","Malang","Capai"], 
            ["Gold","Sidogiri","Bangkalan","Potensi"], 
            ["Gold","Meta","Malang","Capai"], 
            ["Gold","Toko Sahabat / Singgih","Malang","Capai"], 
            ["Gold","Toko Lancar Abadi","Malang","Capai"], 
            ["Gold","Jaya Makmur","Malang","Potensi"], 
            ["Gold","Arif","Malang","Capai"], 
            ["Gold","Mohammad Nur Hadi","Malang","Capai"],
            ["Gold","Sumber Baru / Hadi","Malang","Capai"], 
            ["Gold","Akbar","Malang","Capai"], 
            ["Gold","Family Grosir","Malang","Capai"], 
            ["Gold","Toko Diva","Malang","Capai"], 
            ["Gold","Cv. Boom Mitra Sejati","Blitar","Capai"], 
            ["Gold","Elly Silir","Blitar","Capai"], 
            ["Gold","Toko Bumi Indah","Bojonegoro","Capai"], 
            ["Gold","Toko Pulau Emas","Lamongan","Potensi"], 
            ["Gold","Pt. Saudara Sejati Sejahtera","Bojonegoro","Capai"], 
            ["Gold","Barokah Polim","Bojonegoro","Capai"], 
            ["Gold","Kop. Sampoerna","Surabaya","Capai"], 
            ["Gold","Rejeki Murni","Pamekasan","Potensi"], 
            ["Gold","Greensmart","Surabaya","Capai"], 
            ["Gold","Wijono Chandra","Surabaya","Capai"], 
            ["Gold","Maju Center","Mojokerto","Capai"], 
            ["Gold","David.P","Mojokerto","Capai"], 
            ["Gold","Restu","Mojokerto","Capai"], 
            ["Gold","Sumber Gede","Mojokerto","Potensi"], 
            ["Gold","Rizky Domas","Mojokerto","Capai"], 
            ["Gold","Roxy","Banyuwangi","Potensi"], 
            ["Gold","Sinter Mart","Probolinggo","Potensi"], 
            ["Gold","Toko Indah Mbak","Jember","Capai"], 
            ["Gold","Suid","Kediri","Potensi"], 
            ["Gold","GM Group","Jember","Potensi"], 
            ["Gold","Mudah hasil","Surabaya","Potensi"], 
            ["Gold","Sanrio","Mojokerto","Potensi"], 
            ["Gold","Dea Wijaya","Sidoarjo","Potensi"], 
            ["Gold","Lima Jaya","Surabaya","Potensi"], 
            ["Gold","Merbabu","Surabaya","Potensi"], 
            ["Gold","Central","Pasuruan","Potensi"], 
            ["Gold","Sidojoyo","Pasuruan","Potensi"], 
            ["Gold","Samudera Jaya","Madiun","Potensi"], 
            ["Gold","TOP","Kediri","Potensi"], 
            ["Gold","Dynasty","Kediri","Potensi"], 
            ["Gold","Dira Group","Jember","Potensi"], 
            ["Gold","Virda / Ud. Aba","Ponorogo","Potensi"], 
            ["Gold","Mia","Blitar","Potensi"], 
            ["Gold","Kurnia abadi","Toko   Surabaya","Potensi"], 
            ["Gold","TBMO","Surabaya","Potensi"], 
            ["Gold","Cv. Aloha","Ponorogo","Potensi"], 
            ["Gold","Cv. Samudra Jaya Raya","Blitar","Potensi"], 
            ["Gold","KDS","Probolinggo","Potensi"],            
            ["Gold","Ud. Sumber Sari Bumi","Badung","Capai"], 
            ["Gold","Kusuma Grosir","Bangli","Capai"], 
            ["Gold","Toko Duta Pangan","Tabanan","Capai"], 
            ["Gold","Sari Ketan","Tabanan","Capai"], 
            ["Gold","Gs Mart / MM GS","Tabanan","Capai"], 
            ["Gold","Nengah Bareng","Bangli","Capai"], 
            ["Gold","Toko Denna","Tabanan","Capai"], 
            ["Gold","Toko Putri Asih","Bangli","Capai"], 
            ["Gold","Toko Ari Rama / Pak KT Sirem","Bangli","Capai"], 
            ["Gold","Agung Mayuni","Gianyar","Capai"], 
            ["Gold","Nengah Dagang Plastik","Gianyar","Capai"], 
            ["Gold","Cv. Sumber Pangan","Denpasar","Capai"], 
            ["Gold","Toko Anik II","Tabanan","Capai"], 
            ["Gold","Ud. Mekar Jaya","Klungkung","Capai"], 
            ["Gold","Toko Sedia","Denpasar","Capai"], 
            ["Gold","Vista","Tabanan","Capai"],         
            ["Gold","FreshMart","Manado","Capai"],
        ]

        return Ticket.destroy({
            where: {}
        })
        .then(() => {
            let number = 2019020001
            for(let ticket of tickets) {
                Ticket.create({
                    code: number,
                    outlet: ticket[1].toUpperCase(),
                    area: ticket[2],
                    strata: ticket[0],
                    information: ticket[3]
                })
                number++
            }

            res.status(201).send({
                status: true,
                message: 'Berhasil generate data tiket.',
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
					message: 'Maaf, data tiket tidak ditemukan.'
				})
			}

			return ticket.updateAttributes({
				status: 1
			})
			.then(() => {
				res.status(200).send({
					status: true,
					message: 'Tiket berhasil divalidasi.'
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