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
            ["Platinum","Toko Rizky","Kediri","Capai", "N"],
            ["Platinum","Cahyono","Jombang","Capai", "C"], 
            ["Platinum","Slamet Hariyanto","Ngawi","Capai", "D"], 
            ["Platinum","Slamet Jaya","Ponorogo","Potensi", "N"], 
            ["Platinum","Willy Grosir","Malang","Capai", "D"], 
            ["Platinum","Pt. Segoro Putra Mandiri","Malang","Capai", "D"], 
            ["Platinum","Sumber Jaya","Jombang","Capai", "C"], 
            ["Platinum","Pt. Sadar Mandiri Perkasa","Malang","Capai", "D"], 
            ["Platinum","Toko Agung","Jombang","Capai", "B"], 
            ["Platinum","Toko Rejojoyo","Malang","Capai", ""], 
            ["Platinum","Toko Timur","Blitar","Capai", ""], 
            ["Platinum","Podo Sehat (Aken)","Jombang","Capai", "C"], 
            ["Platinum","Bravo Swalayan","Jombang","Capai", "C"], 
            ["Platinum","Maya Sari Wijaya","Surabaya","Capai", "H"], 
            ["Gold","Dirgantara","Tulungagung","Potensi", "H"], 
            ["Gold","Vio Jaya","Banyuwangi","Capai", "S"], 
            ["Gold","Lestari Jaya","Malang","Capai", "F"], 
            ["Gold","Cv. Langgeng Gemilang","Jombang","Capai", "B"], 
            ["Gold","Toko Baru Muda","Malang","Potensi", ""], 
            ["Gold","Toko Roni","Malang","Capai", "F"], 
            ["Gold","Widodo","Malang","Capai", "F"], 
            ["Gold","Sumber Hidup / Cv. Agro Sumber Makmur","Malang","Capai", "F"], 
            ["Gold","Soehandi","Malang","Capai", ""], 
            ["Gold","Sadar","Malang","Capai", "F"], 
            ["Gold","Toko Kurnia Usaha","Malang","Potensi", ""], 
            ["Gold","Pt. Mitra Agro Utama","Malang","Capai", "L"], 
            ["Gold","Syabana","Jombang","Capai", "I"], 
            ["Gold","Ferry","Sidoarjo","Potensi", "I"], 
            ["Gold","Samudra Berkah","Malang","Capai", "L"], 
            ["Gold","Toko Lestari","Kediri","Capai", "N"], 
            ["Gold","Toko Vani Vita","Malang","Capai", "L"], 
            ["Gold","Pun Jaya","Jombang","Capai", "B"], 
            ["Gold","Cv. Tiara","Ngawi","Potensi", "O"], 
            ["Gold","Toko Semeru","Malang","Capai", "L"], 
            ["Gold","Toko Anik Ub","Malang","Capai", "K"], 
            ["Gold","Sahabat","Malang","Potensi", "Y"], 
            ["Gold","Toko Baru","Malang","Capai", "L"], 
            ["Gold","Adin Putra","Blitar","Capai", "Q"], 
            ["Gold","Golden","Kediri","Capai", "N"], 
            ["Gold","Surya Grosir","Ponorogo","Capai", "O"], 
            ["Gold","Sumber Damai","Malang","Capai", "J"], 
            ["Gold","Pitoyo","Malang","Capai", "J"], 
            ["Gold","Sugeng Jaya","Malang","Capai", "K"], 
            ["Gold","Tentrem","Blitar","Capai", "R"], 
            ["Gold","Berkat Melimpah","Sidoarjo","Capai", "H"], 
            ["Gold","Bu Erlida","Blitar","Capai", "R"], 
            ["Gold","Bu Widya","Blitar","Potensi", "R"], 
            ["Gold","Air Mancur","Malang","Capai", "K"], 
            ["Gold","Rudi","Malang","Capai", "K"], 
            ["Gold","Ud. Sumber Bahagia ","Jombang","Capai", "A"], 
            ["Gold","Pojok Sahar","Malang","Capai", "J"], 
            ["Gold","Toko Jaya Usaha / Gatik","Blitar","Capai", "R"], 
            ["Gold","Arto Moro","Jombang","Capai", "A"], 
            ["Gold","Bintang Mas Perkasa","Sidoarjo","Capai", "H"], 
            ["Gold","Kuat","Magetan","Capai", "O"], 
            ["Gold","Santoso","Malang","Capai", "J"], 
            ["Gold","Sidogiri","Bangkalan","Potensi", ""], 
            ["Gold","Meta","Malang","Capai", "J"], 
            ["Gold","Toko Sahabat / Singgih","Malang","Capai", "P"], 
            ["Gold","Toko Lancar Abadi","Malang","Capai", "P"], 
            ["Gold","Jaya Makmur","Malang","Potensi", ""], 
            ["Gold","Arif","Malang","Capai", "P"], 
            ["Gold","Mohammad Nur Hadi","Malang","Capai", "P"],
            ["Gold","Sumber Baru / Hadi","Malang","Capai", "P"], 
            ["Gold","Akbar","Malang","Capai", "Q"], 
            ["Gold","Family Grosir","Malang","Capai", "Q"], 
            ["Gold","Toko Diva","Malang","Capai", "Q"], 
            ["Gold","Cv. Boom Mitra Sejati","Blitar","Capai", "X"], 
            ["Gold","Elly Silir","Blitar","Capai", "X"], 
            ["Gold","Toko Bumi Indah","Bojonegoro","Capai", "U"], 
            ["Gold","Serbaguna","Lamongan","Potensi", "U"], 
            ["Gold","Pt. Saudara Sejati Sejahtera","Bojonegoro","Capai", "U"], 
            ["Gold","Barokah Polim","Bojonegoro","Capai", "U"], 
            ["Gold","Kop. Sampoerna","Surabaya","Capai", "G"], 
            ["Gold","Rejeki Murni","Pamekasan","Potensi", ""], 
            ["Gold","Greensmart","Surabaya","Capai", "G"], 
            ["Gold","Wijono Chandra","Surabaya","Capai", "G"], 
            ["Gold","Maju Center","Mojokerto","Capai", "A"], 
            ["Gold","David.P","Mojokerto","Capai", "A"], 
            ["Gold","Restu","Mojokerto","Capai", "I"], 
            ["Gold","Sumber Gede","Mojokerto","Potensi", "I"], 
            ["Gold","Rizky Domas","Mojokerto","Capai", "A"], 
            ["Gold","Roxy","Banyuwangi","Potensi", "S"], 
            ["Gold","Sinter Mart","Probolinggo","Potensi", "T"], 
            ["Gold","Toko Indah Mbak","Jember","Capai", "T"], 
            ["Gold","Suid","Kediri","Potensi", ""], 
            ["Gold","GM Group","Jember","Potensi", ""], 
            ["Gold","Makmur","Surabaya","Potensi", "M"], 
            ["Gold","Samirejo","Mojokerto","Potensi", "I"], 
            ["Gold","Dea Wijaya","Sidoarjo","Potensi", ""], 
            ["Gold","Lima Jaya","Surabaya","Potensi", "G"], 
            ["Gold","Merbabu","Surabaya","Potensi", "M"], 
            ["Gold","Central","Pasuruan","Potensi", "X"], 
            ["Gold","Sidojoyo","Pasuruan","Potensi", "X"], 
            ["Gold","Mitra Utama","Madiun","Potensi", "Y"], 
            ["Gold","TOP","Kediri","Potensi", ""], 
            ["Gold","Dynasty","Kediri","Potensi", "N"], 
            ["Gold","Dira Group","Jember","Potensi", ""], 
            ["Gold","Virda / Ud. Aba","Ponorogo","Potensi", "O"], 
            ["Gold","Mia","Blitar","Potensi", ""], 
            ["Gold","Omega","Toko   Surabaya","Potensi", "T"], 
            ["Gold","TBMO","Surabaya","Potensi", "T"], 
            ["Gold","Cv. Aloha","Ponorogo","Potensi", ""], 
            ["Gold","Cv. Samudra Jaya Raya","Blitar","Potensi", ""], 
            ["Gold","KDS","Probolinggo","Potensi", "T"],            
            ["Gold","Ud. Sumber Sari Bumi","Badung","Capai", "W"], 
            ["Gold","Kusuma Grosir","Bangli","Capai", "W"], 
            ["Gold","Toko Duta Pangan","Tabanan","Capai", "W"], 
            ["Gold","Sari Ketan","Tabanan","Capai", "W"], 
            ["Gold","Gs Mart / MM GS","Tabanan","Capai", "W"], 
            ["Gold","Nengah Bareng","Bangli","Capai", "W"], 
            ["Gold","Toko Denna","Tabanan","Capai", "W"], 
            ["Gold","Toko Putri Asih","Bangli","Capai", "W"], 
            ["Gold","Toko Ari Rama / Pak KT Sirem","Bangli","Capai", "W"], 
            ["Gold","Agung Mayuni","Gianyar","Capai", "V"], 
            ["Gold","Nengah Dagang Plastik","Gianyar","Capai", "V"], 
            ["Gold","Cv. Sumber Pangan","Denpasar","Capai", "V"], 
            ["Gold","Toko Anik II","Tabanan","Capai", "V"], 
            ["Gold","Ud. Mekar Jaya","Klungkung","Capai", "V"], 
            ["Gold","Toko Sedia","Denpasar","Capai", "V"], 
            ["Gold","Vista","Tabanan","Capai", "V"],         
            ["Gold","FreshMart","Manado","Capai", "V"],
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
                    information: ticket[3],
                    table: ticket[4]
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