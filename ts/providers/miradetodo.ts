// @ts-nocheck 


// not check

source.getResource =  async (movieInfo, config, callback) => {

	const url = `https://miradetodo.co/?s=${slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})}`
	const htmlSearch = await libs.request_get(url)
	let parseSearch = cheerio.load(htmlSearch)

	let link = ""
	console.log(parseSearch(".item_1.items .item").length, "----------- MIRADETODO SEARCH LENGTH ----------")
	parseSearch(".item_1.items .item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".boxinfo .tt").text()
		let href = parseSearch(itemSearch).find(".boxinfo a").first().attr("href")
		let year = title.match(/\( *([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+.*/i, "").trim()

		console.log(title, href, year, "----------- MIRADETODO SEARCH INFO ----------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			
			if (movieInfo.type == "movie") {
				if (year == movieInfo.year) {
					link = href;
				}
			} 
			if (movieInfo.type == "tv") {
				link = href
			}
		}
	})

	console.log(link, "----------- MIRADETODO LINK ----------")
	if (link != "") {
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)

		let linkEmbed = ""
		if (movieInfo.type == "movie") {
			linkEmbed = link;
		} 
		if (movieInfo.type == "tv") {
			parseDetail(".episodios li").each((keyDetail, itemDetail) => {
				let seasonInfo = parseDetail(itemDetail).find(".numerando").text()
				let season = seasonInfo.match(/([0-9]+)/i)
				season = season ? season[1] : 0
				let episode = seasonInfo.match(/[0-9]+ *x *([0-9]+)/i)
				episode = episode ? episode[1] : 0
				let href = parseDetail(itemDetail).find(".episodiotitle a").attr("href")

				console.log(season, episode, href, "----------- MIRADETODO SEASON INFO ----------")
				if (movieInfo.season == season && movieInfo.episode == episode) {
					linkEmbed = href
				}
			})
		}


		console.log(linkEmbed, "----------- MIRADETODO LINK EMBED ----------")

		if (linkEmbed != "") {
			let htmlEmbed = await libs.request_get(linkEmbed)
			let parseEmbed = cheerio.load(htmlEmbed)

			let embeds = []

			console.log(parseEmbed("#player21 iframe").length, "----------- MIRADETODO IFRAME LENGTH ----------")
			parseEmbed("#player21 iframe").each((keyEmbed, itemEmbed) => {
				let embed = parseEmbed(itemEmbed).attr("data-lazy-src")
				if (embed) {
					embeds.push(embed)
				}
			})

			console.log(embeds, "----------- MIRADETODO EMBEDS ----------")
			let arrMap = embeds.map(async (embed) => {
				if (embed.indexOf("player.miradetodo") != -1) {
					let htmlSource = await libs.request_get(embed)
					let parseSource = cheerio.load(htmlSource)
					let sources = []

					console.log(parseSource("#menu li").length, "----------- MIRADETODO PARSE EMBED SOURCE ----------")
					parseSource("#menu li").each((keySource, itemSource) => {
						let source = parseSource(itemSource).find("a").attr("href")
						if (source) {
							sources.push(source)
						}
					})

					console.log(sources, "----------- MIRADETODO EMBED SOURCES ----------")
					let arrMapSource = sources.map(async (linkSource) => {
						let htmlLink = await libs.request_get(linkSource)
						let parseLink = cheerio.load(htmlLink)

						let embedL = parseLink("iframe").attr("src").replace("\r", "").trim()

						console.log(embedL, "----------- MIRADETODO EMBED V2 ----------")
						if (embedL) {
							const fileSize = await libs.request_getFileSize(embedL)
							const host = libs.string_getHost(embedL)

							console.log(embedL, fileSize, host, "embedL--------------------")	
							if (hosts[host]) {
								hosts[host](embedL, movieInfo, _.merge(config, {provider: "Miradetodo", urlDetail: link}), callback)
							}
						}
					})
					await Promise.all(arrMapSource)
				} else {
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (!fileSize) {
							
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "Miradetodo", urlDetail: link}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "Miradetodo"
						})
					}
				}
			})
			await Promise.all(arrMap)
		}
	}

}
