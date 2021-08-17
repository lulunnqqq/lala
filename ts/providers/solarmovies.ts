// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	let urlSearch = `https://solarmovie.mom/search/?keyword=${slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})}`
	console.log(urlSearch, "---------- SOLAR URL SEARCH --------")
	let htmlSearch = await libs.request_get(urlSearch)
	let parseSearch = cheerio.load(htmlSearch)

	let link = ""
	console.log(parseSearch(".ml-item").length, '-------------- SOLAR SEARCH ITEM ---------------')
	parseSearch(".ml-item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".mli-info h2").text()
		let season = title.toLowerCase().match(/\- *season *([0-9]+)/i)
		season = season ? season[1] : 0
		title = title.toLowerCase().replace(/\- * season *[0-9]+/i, "").trim()
		let episode = parseSearch(itemSearch).find(".mli-eps i").text()
		let href = parseSearch(itemSearch).find(".ml-mask.jt").attr("href")

		console.log(title, season, episode, href, '------------------ SOLAR INFO -----------')
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie" && !episode) {
				link = href
			}
			if (movieInfo.type == "tv" && season == movieInfo.season && episode == movieInfo.episode) {
				link = href
			}
		}
	})

	console.log(link, '------------ SOLAR LINK -------------')
	if (link != "") {
		link = link + 'watching.html'
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)
		let movieId = htmlDetail.match(/movie_id *= *\'([^\']+)/i)
		movieId = movieId ? movieId[1] : ""
		let urlAjaxEpisode = `https://solarmovie.mom/ajax/v2_get_episodes/${movieId}`
		let htmlEpisode = await libs.request_get(urlAjaxEpisode)
		let parseEpisode = cheerio.load(htmlEpisode)
		let ids = []

		console.log(parseEpisode(".btn-eps").length, '------------- SOLAR EMBEDS SEARCH IDS --------------')
		parseEpisode(".btn-eps").each((keyEpisode, itemEpisode) => {
			let title = parseEpisode(itemEpisode).attr("title")
			let episode = title.toLowerCase().match(/episode *([0-9]+)/i)
			episode = episode ? episode[1] : 0
			let eId = parseEpisode(itemEpisode).attr("episode-id")

			if (movieInfo.type == "tv") {
				if (movieInfo.episode == episode) {
					ids.push(eId)
				}
			} else {
				ids.push(eId)
			}
		
		})

		console.log(ids, '------------- SOLAR  ID --------------')
		let urlAjaxEmbed = `https://solarmovie.mom/ajax/load_embed/`
		let arrMap = ids.map(async (eId) => {
			let res = await libs.request_get(`${urlAjaxEmbed}mov${eId}`, {}, 'json')
			console.log(res, `${urlAjaxEmbed}mov${eId}`, '----------------- SOLAR EMBED -----------')
			if (res.status == 1) {
				let embed = res.embed_url;
				if (embed) {
					if (embed.indexOf("solarmovie") != -1) {
						let getEmbedSolar = await libs.request_get(embed, {}, 'json')
						if (getEmbedSolar.embed_url) {
							embed = getEmbedSolar.embed_url
						}
					}
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (!fileSize) {
					
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "SolarMovies"}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "SolarMovies"
						})
					}
				}
			}
		})
		await Promise.all(arrMap)
	}

}
