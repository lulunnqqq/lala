// @ts-nocheck

// http://cinewhale.com/



source.getResource =  async (movieInfo, config, callback) => {


	let url =  "";
	let classParse = ""
	if (movieInfo.type == "movie") {
		url = `https://cinewhale.com/searching/movies?q=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`	
		classParse = ".latest-movies"
	} else {
		url = `https://cinewhale.com/searching/tvshows?q=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`	
		classParse = ".latest-tvshows"
	}
	

	let link = "";
	let parse = await libs.request_getcaptcha(url, {}, "cheerio");



	console.log(parse(`${classParse} .big-grid-view li`).length, "--------------- CINEWHALE SEARCH -----------")
	parse(`${classParse} .big-grid-view li`).each((key, item) => {
		let href = parse(item).find("a").attr("href")
		let title = parse(item).find(".title").text()
		let year = title.match(/\(([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim();

		console.log(href, title, year, slugify(movieInfo.title, {lower: true}), slugify(title.trim(), {lower: true}), " ------------ CINEWHALE SEARCH INFO --------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie" && year == movieInfo.year) {
				link = href
			}

			if (movieInfo.type == "tv") {
				link = href
			}
		}
	})

	console.log(link, "--------- CINEWHALE LINK ------------")
	if (link != "") {
		let parseDetail = await libs.request_getcaptcha(link, {}, "cheerio")
		if (movieInfo.type == "movie") {
			
			console.log(parseDetail(".streams-list li").length, "--------- CINEWHALE EMBED LENGTH ------------")
			let sources = []
			parseDetail(".streams-list li").each((key, item) => {
				let href = parseDetail(item).find("a").attr("href")
				sources.push(href)
			})


			let direct = parseDetail(".movie-direct-stream-holder .movie-direct-stream").attr("data-src")


			if (direct) {
				sources.push(direct)
			}
			console.log(sources, "--------- CINEWHALE direct ------------")
			let arrMap = sources.map(async (embed) => {

				if (embed) {
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (fileSize == 0) {
					
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "CINEWHALE"}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "CINEWHALE"
						})
					}
				}
				
				
				
			})
			await Promise.all(arrMap)
		}

		if (movieInfo.type == "tv") {
			let linkTv = []

			console.log(parseDetail(".tvshows-streams-list li").length ,"------------- CINEWHALE EMBED TV ---------")
			parseDetail(".tvshows-streams-list li").each((keySeason, itemSeason) => {
				let season = parseDetail(itemSeason).find("summary").first().text()
				season = season.toLowerCase().match(/season *([0-9]+)/i)
				season = season ? season[1] : 0

				console.log(season, movieInfo.season, "------------ CINEWHALE SEASON INFo ------------- ")
				if (season == movieInfo.season) {
					parseDetail(itemSeason).find(".episodes-list li").each((keyEpisode, itemEpisode) => {
						let episode = parseDetail(itemEpisode).find(".episode-number").text()

						console.log(episode, movieInfo.episode, "------------ CINEWHALE SEASON INFo ------------- ")
						if (episode == movieInfo.episode) {
							parseDetail(itemEpisode).find(".embeds-list li").each((keyS, itemS) => {
								let hrefTv = parseDetail(itemS).find("a").attr("href")
								linkTv.push(hrefTv)
							})
						}
					})
				}
			})
			

			console.log(linkTv, "------------ CINEWHALE TV LIST LINK ------------- ")
			let arrMap = linkTv.map(async (embed) => {

				if (embed) {
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (fileSize == 0) {
					
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "CINEWHALE"}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "CINEWHALE"
						})
					}
				}
				
				
				
			})
			await Promise.all(arrMap)
		}
	}
}