// @ts-nocheck

source.getResource = async (movieInfo, config, callback) => {

	let urlSearch = ""
	if (movieInfo.type == "movie")	 {
		urlSearch = `https://database.gdriveplayer.me/movie.php?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	} else {
		urlSearch = `https://database.gdriveplayer.me/series.php?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	}

	let htmlSearch = await libs.request_get(urlSearch, {
		"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
	})
	let parseSearch = cheerio.load(htmlSearch)


	let sources = []

	if (movieInfo.type == "movie") {
		console.log(parseSearch("#t01 tr").length, urlSearch, "--------- DATABASE DRIVE SEARCH ---------")
		parseSearch("#t01 tr").each((keySearch, itemSearch) => {
			let title = parseSearch(itemSearch).find("td").first().next().next().find("a").text()
			let year = parseSearch(itemSearch).find("td").first().next().next().next().find("b").text()
			title = title.replace(/\( *[0-9]+ *\)/i, "").trim()

			console.log(title, year, "--------- DATABASE DRIVE INFO ---------")
			if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
				if (year == movieInfo.year) {
					parseSearch(itemSearch).find("td").first().next().next().next().next().next().next().next().next().find("b").each((keyEmbed, itemEmbed) => {
						let embed = parseSearch(itemEmbed).find("a").attr("href")
						if (embed.indexOf("https://") == -1 && embed.indexOf("http://") == -1) {
							embed = embed.replace("//", "https://");
						}
						sources.push(embed)
					})
				}
			}
		})
	} else {
		let linkDetailEpisode = ""

		console.log(parseSearch("#t01 tbody tr").length, "--------- DATABASE DRIVE SEARCH TV ---------")
		parseSearch("#t01 tbody tr").each((keySearch, itemSearch) => {
			let title = parseSearch(itemSearch).find("td").first().next().next().find("a").text()
			let href = parseSearch(itemSearch).find("td").first().next().next().next().next().next().next().next().next().find("button").attr("onclick")
			let season = title.toLowerCase().match(/\- *season *([0-9]+)/i)
			season = season ? season[1] : 0
			title = title.replace(/\- *season *[0-9]+/i, "").trim()

			console.log(title, href, season, "--------- DATABASE DRIVE INFO TV ---------")
			if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
				if (season == movieInfo.season) {
					let idEpisode = href.match(/id\=([0-9]+)/i)
					idEpisode = idEpisode ? idEpisode[1] : 0
					linkDetailEpisode = `https://database.gdriveplayer.me/series.php?id=${idEpisode}`
				}
			}
		})

		console.log(linkDetailEpisode, "------------- DB DRIVE LINK EPISODE ------------")
		if (!linkDetailEpisode) {
			let htmlEpisode = await libs.request_get(linkDetailEpisode)
			let parseEpisode = cheerio.load(htmlEpisode)

			console.log(parseEpisode("#t01 tbody tr").length, "------------- DB DRIVE LENGTH EPISODE ------------")
			parseEpisode("#t01 tbody tr").each((keySearch, itemSearch) => {
				let episode = parseSearch(itemSearch).find("td").first().next().next().text()

				console.log(episode, movieInfo.episode, "-------------- DB DRIVE MAPPING EPISODE ----------")
				if (episode == movieInfo.episode) {
					parseEpisode.find("td").first().next().next().next().next().next().find("a").each((keyEpisode, itemEpisode) => {
						let embed = parseSearch(itemEpisode).find("a").attr("href")
						
						sources.push("https://database.gdriveplayer.me/" + embed)
					})
				}
				
			})
		}
	}
		
	console.log(sources, '----------- DB DRIVE SOURCES ------------')
	let appMap = sources.map(async (embed) => {
		try {
			if (embed) {
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (fileSize == 0) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "MovieBlueray"}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "MovieBlueray"
					})
				}
			}
		} catch(e) {}
	})
	await Promise.all(appMap)
}
