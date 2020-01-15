const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

// store, index, show, update, destroy

module.exports = {
	async index(req, res) {
		const devs = await Dev.find()

		return res.json(devs)
	},

	async store(req, res) {
		const { github_username, techs, latitude, longitude } = req.body	
		
		const apiGithub = await axios.get(`https://api.github.com/users/${github_username}`)
		
		const { name = login, avatar_url, bio } = apiGithub.data

		let dev = await Dev.findOne({ github_username })

		if(!dev) {
			const techsArray = parseStringAsArray(techs)
	
			const location = {
				type: 'Point', 
				coordinates: [longitude, latitude]
			}
		
			dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				techs: techsArray,
				location,
			})	
		}
	
		return res.json(dev)
	},

	async destroy(req, res) {
		const { github_username } = req.params

		const dev = await Dev.findOne({ github_username })
		if(dev) {
			const devID = dev._id
			await Dev.remove({
				_id: {
					$eq: devID
				}
			})			

			return res.json({ result: "Excluído" })
		}
		return res.json({ result: "Falhou, nenhum dev correspondente"})
	}
}