// @ts-nocheck

source.getResource =  async (movieInfo, config, callback) => {

	String.prototype.asdqew = function(key = 123) {
		var b = "";
		for (var i = 0; i < this.length;) {
			for (var j = 0;
				(j < key.toString().length && i < this.length); j++, i++) {
				b += String.fromCharCode(this[i].charCodeAt(0) ^ key.toString()[j].charCodeAt(0))
			}
		}
		return b
	}

	let urlSearch = ""
	if (movieInfo.type == "movie") {
		urlSearch = `https://ww1.couchtuner.space/search/${slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})}/movies`
	} else {
		urlSearch = `https://ww1.couchtuner.space/search/${slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})}/series`
	}

	const htmlSearch = await libs.request_get(urlSearch)
	const parseSearch = cheerio.load(htmlSearch)
	let link = "";

	console.log(urlSearch, parseSearch(".c_UBDKbgadOvFEQplfxJZRQRWTOb").length, "------------ COUCHTUNER SEARCH LENGTH -------")
	parseSearch(".c_UBDKbgadOvFEQplfxJZRQRWTOb").each((keySearch, itemSearch) => {

		
		let year = parseSearch(itemSearch).attr("data-year")
		let title = parseSearch(itemSearch).attr("data-filmname")
		let episode = parseSearch(itemSearch).attr("data-count-episode")
		let season = title.toLowerCase().match(/\- *season *([0-9]+)/i)
		season = season ? season[1] : 0
		title = title.toLowerCase().replace(/\- *season *[0-9]+/i, "").trim()

		console.log(year, title, episode, season, "------------ COUCHTUNER SEARCH INFO -------")
		if (slugify(movieInfo.title, { lower: true, remove: /[*+~.()'"!:@]/g }) == slugify(title.trim(), { lower: true, remove: /[*+~.()'"!:@]/g })) {
			if (movieInfo.type == "movie" && year ==  movieInfo.year) {
				let href = parseSearch(itemSearch).find("a.item_hd").attr("href")
				link = href;
			}

			if (movieInfo.type == "tv" && season == movieInfo.season) {
				let href = parseSearch(itemSearch).find("a.item_series").attr("href")
				link = href
			}
		}
	})

	let headers = {
		accept: "application/json, text/javascript, */*; q=0.01",
		"x-requested-with": "XMLHttpRequest",
		"sec-fetch-site": "same-origin",
		"sec-fetch-mode": "cors"
	}

	console.log(link, "------------ COUCHTUNER LINK -------")
	if (link != "") {
		link = `https://ww1.couchtuner.space${link}`
		let linkDetail = "";
		if (movieInfo.type == "movie") {
			linkDetail = link;
		} else {
			let htmlDetailTv = await libs.request_get(link)
			let parseDetailTv = cheerio.load(htmlDetailTv)

			console.log(parseDetailTv(".c_RJCqWnYsvGePCdFmByJaeLVQOI").length, "------------ COUCHTUNER SEARCH TV LENGTH -------")
			parseDetailTv(".c_RJCqWnYsvGePCdFmByJaeLVQOI").each((keyTv, itemTv) => {
				let hrefTv = parseDetailTv(itemTv).attr("href");
				let titleTv = parseDetailTv(itemTv).attr("title")

				if (titleTv && hrefTv) {
					hrefTv = "https://ww1.couchtuner.space" + hrefTv;
					let episodeTv = titleTv.toLowerCase().match(/episode *([0-9]+)/i)
					episodeTv = episodeTv ? episodeTv[1] : 0

					console.log(hrefTv, titleTv, episodeTv, "------------ COUCHTUNER EPISODE INFO SEARCH -------")
					if (episodeTv == movieInfo.episode) {
						linkDetail = hrefTv;
					}
				}
				

			})
		}

		console.log(linkDetail, "------------ COUCHTUNER LINK FILM -------")
		if (linkDetail != "") {
			let htmlDetail = await libs.request_get(linkDetail)
			let mId = htmlDetail.match(/data.PlayerReports.m_id *= *\'([^\']+)/i)
			mId = mId ? mId[1] : ""
			let fId = htmlDetail.match(/data.PlayerReports.f_id *= *\'([^\']+)/i)
			fId = fId ? fId[1] : ""

			console.log(mId, fId, "------------ COUCHTUNER FID MID -------")
			let urlServer = `https://ww1.couchtuner.space/user/servers/${mId}?ep=${movieInfo.type == "tv" ? fId : '0'}`
			let htmlServer = await libs.request_get(urlServer)
			let parseServer = cheerio.load(htmlServer);
			let servers = []

			console.log(urlServer, parseServer(".c_xZwLteZxeaxNFANGijuJZvhPWE").length, "------------ COUCHTUNER SERVER LENGTH -------")
			parseServer(".c_xZwLteZxeaxNFANGijuJZvhPWE").each((keyServer, itemServer) => {
				let serverName = parseServer(itemServer).attr("data-value");
				if (serverName) {
					servers.push(serverName)
				}
			})

			console.log(servers, "------------ COUCHTUNER SERVER INFO -------")
			let arrMap = servers.map(async (server) => {
				let urlAjaxServer = `${linkDetail}?server=${server}`
				let resultSearch = await libs.request_get(urlAjaxServer, headers);
				resultSearch = JSON.parse(atob(resultSearch).asdqew())

				console.log(resultSearch, "------------ COUCHTUNER AJAX RESULT SERVER -------")
				let arrMapSource = resultSearch.map(async (itemSource) => {
					let embed = itemSource.file;
					const host = libs.string_getHost(embed)

					console.log(embed, host, itemSource, "embed--------------------")
					if (embed) {
						if (itemSource.type == "m3u8") {
							callback({
								file: embed,
								size: "",
								host: host.toUpperCase(),
								provider: "CouchTuner",
								quality: "360p"
							})
						} else {
							const fileSize = await libs.request_getFileSize(embed)
							

							
							if (!fileSize) {
									
								if (hosts[host]) {
									hosts[host](embed, movieInfo, _.merge(config, {provider: "CouchTuner", urlDetail: link}), callback)
								}
							} else {
								callback({
									file: embed,
									size: fileSize,
									host: host.toUpperCase(),
									provider: "CouchTuner"
								})
							}
						}
					}
					
				})
				await Promise.all(arrMapSource)
			})
			await Promise.all(arrMap)
		}
	}
}