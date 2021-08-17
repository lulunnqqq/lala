// @ts-nocheck

//https://soap2day.to/

source.getResource = async (movieInfo, config, callback) => {

	let url = `https://soap2day.to/search/keyword/${slugify(movieInfo.title, {lower: true, replacement: "%20"})}`	
	let parse = await libs.request_getcaptcha(url, {}, "cheerio", "sources_clouflare")
	let link = ""

	console.log(parse(".col-lg-2.col-md-3.col-sm-4.col-xs-6.no-padding").length, "------------ SOAP SEARCH INFO ------------")
	parse(".col-lg-2.col-md-3.col-sm-4.col-xs-6.no-padding").each((key, item) => {
		let href = parse(item).find("h5 a").first().attr("href")
		let title = parse(item).find("h5 a").first().text()
		let year = parse(item).find(".label.label-info").text()

		console.log(href, title, year, "------------- SOAP INFO FILM ---------------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

			if (movieInfo.type == "movie" && year == movieInfo.year) {
				link = href
			}
			if (movieInfo.type == "tv") {
				link = href
			}
			
		}
	})

	console.log(link, "-------------- SOAP LINK FILM ---------------")
	if (link != "") {
		let parseDetail = await libs.request_getcaptcha(link, {}, "cheerio", "sources_clouflare")
		let id = parseDetail("#hId").attr("value")
		let urlPostAjax = "https://soap2day.to/home/index/GetMInfoAjax"
		if (movieInfo.type == "movie") {

			let postRequest = await libs.request_postcaptcha(urlPostAjax, {pass: id}, {}, "sources_clouflare")
			let parseRequest = JSON.parse(postRequest)
			let source = []
 			if (parseRequest.val) {
 				source.push(parseRequest.val)
 			}
 			if (parseRequest.val_bak) {
 				source.push(parseRequest.val_bak)
 			}
 			let arrMap = source.map(async (embed) => {
 				if (embed) {
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (fileSize == 0) {
					
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "SOAP"}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "SOAP"
						})
					}
				}
 			})
 			await Promise.all(arrMap)
		}
	}

	if (movieInfo.type == "tv") {
		let linkTv = ""
		parseDetail(".alert.alert-info-ex.col-sm-12").each((key, item) => {
			let season = parse(item).find('h4').first().text()
			season = season.toLowerCase().match(/season *([0-9]+)/i)
			season = season ? season[1] : 0
			if (season == movieInfo.season) {
				parse(item).find("col-sm-12.col-md-6.col-lg-4.myp1").each((keyE, itemE) => {
					let episode = parse(itemE).find("a").text()
					let href = parse(itemE).find("a").attr("href")
					episode = episode.match(/([0-9]+) *\./i)
					episode = episode ? episode[1] : 0

					if (episode == movieInfo.episode) {
						linkTv = href
					}
				})
			}
		})

		if (linkTv != "") {
			parseEpisode = await  libs.request_getcaptcha(linkTv, {}, "cheerio", "sources_clouflare")
			let id = parseEpisode("#hId").attr("value")
			let postEpisode = await libs.request_postcaptcha(urlPostAjax, {pass: id}, {})
			let parseRequestEpisode = JSON.parse(postEpisode)
			let source = []
 			if (parseRequestEpisode.val) {
 				source.push(parseRequestEpisode.val)
 			}
 			if (parseRequestEpisode.val_bak) {
 				source.push(parseRequestEpisode.val_bak)
 			}
 			let arrMap = source.map(async (embed) => {
 				if (embed) {
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (fileSize == 0) {
					
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "SOAP"}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "SOAP"
						})
					}
				}
 			})
 			await Promise.all(arrMap)
		}
	}
	
}
