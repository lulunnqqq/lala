// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {


	/*
		DECRYPT
	*/
	let _0x904e = ["", "\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39", "\x72\x61\x6E\x64\x6F\x6D", "\x6C\x65\x6E\x67\x74\x68", "\x66\x6C\x6F\x6F\x72", "\x63\x68\x61\x72\x41\x74", "\x63\x6C\x69\x63\x6B", "\x23\x70\x6C\x61\x79", "\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74", "\x75\x73\x65\x72\x41\x67\x65\x6E\x74", "\x4C\x6F\x61\x64\x69\x6E\x67\x20\x76\x69\x64\x65\x6F\x2E\x2E\x2E\x20\x50\x6C\x65\x61\x73\x65\x20\x77\x61\x69\x74\x2E", "\x74\x65\x78\x74", "\x2E\x6C\x6F\x61\x64\x69\x6E\x67", "\x6F\x72\x69\x67\x69\x6E\x61\x6C\x45\x76\x65\x6E\x74", "\x2A", "\x70\x61\x67\x65\x58", "\x70\x61\x67\x65\x59", "\x76\x61\x6C", "\x23\x70\x6C\x61\x79\x49\x44", "\x73\x75\x62\x6D\x69\x74", "\x23\x70\x6C\x61\x79\x46\x6F\x72\x6D", "\x6F\x6E"];
	function x_dfjsd45(_0x5196x2) {
	 var _0x5196x3 = _0x904e[0];
	 var _0x5196x4 = _0x904e[1];
	 for (var _0x5196x5 = 0; _0x5196x5 < _0x5196x2; _0x5196x5++) {
	  _0x5196x3 += _0x5196x4[_0x904e[5]](Math[_0x904e[4]](Math[_0x904e[2]]() * _0x5196x4[_0x904e[3]]))
	 };
	 return _0x5196x3
	}

	function x7_pw481e(_0x5196x3) {
	 return libs.string_btoa(_0x5196x3)
	}
	var _0x5196xa = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
  	var _0x5196xb = Math[_0x904e[4]](Math[_0x904e[2]]() * (20 - 10 + 1)) + 10;
  	var _0x5196xc = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
	var _0x5196xd = Math[_0x904e[4]](Math[_0x904e[2]]() * (9 - 0 + 1)) + 0;
	let playId = _0x5196xc + _0x904e[0] + _0x5196xa + _0x904e[0] + x_dfjsd45(_0x5196xa) + _0x904e[0] + x7_pw481e("[object MouseEvent]" /* [object MouseEvent] */ + _0x904e[14] + 642 /*642*/ + _0x904e[14] + 150) /* 150 */ + _0x904e[0] + x_dfjsd45(_0x5196xb) + _0x904e[0] + _0x5196xb + _0x904e[0] + _0x5196xd;
	console.log(playId, "--------------- CINEBLOOM playID ------------")

	let url = ""
	if (movieInfo.type == "movie") {
		url = `https://www.cinebloom.org/searched/movies?q=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	} else {
		url = `https://www.cinebloom.org/searched/tvshows?q=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	}
	let link = ""
	let parse = await libs.request_getcaptcha(url, {}, "cheerio")

	console.log(parse(".grid-view.clearfix li").length, '--------- CINEBLOOM SEARCH PARSE ------')
	parse(".grid-view.clearfix li").each((key, item) => {
		let href = parse(item).find("a").first().attr("href");
		let title = parse(item).find(".information .title strong").text()
		let year = title.match(/\(([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim();

		console.log(href, title, year, slugify(movieInfo.title, {lower: true}), slugify(title.trim(), {lower: true}),  "---------- CINEBLOOM INFO MOVIE -----------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie" && year == movieInfo.year) {
				link = href
			}
			if (movieInfo.type == "tv") {
				link = href
			}
		}
	})

	console.log(link, "--------------- CINEBLOOM LINK -----------")
	if (link != "") {
		let parseDetail = await libs.request_getcaptcha(link, {}, "cheerio")
		if (movieInfo.type == "movie") {
			
			let sources = []

			console.log(parseDetail(".embed-details").length, "--------------- CINEBLOOM EMBED -----------")
			parseDetail(".embed-details").each((key, item) => {
				let href = parseDetail(item).find("a").attr("href")
				sources.push(href)
			})

			console.log(sources, "--------------- CINEBLOOM EMBED -----------")
			let arrMap = sources.map(async (embed) => {

				if (embed) {

					if (embed.toLowerCase().trim().indexOf("cinebloom") != -1) {

						console.log("------- CINEBLOOM DETECT -----------", embed)
						let loadSource = "https://oload.party/loadsource.php"
						let parseCinemaEmbed = await libs.request_getcaptcha(embed, {}, "cheerio")
						let urlCinema = parseCinemaEmbed("#playForm").attr("action")
						let bodyCinema = `playID=${playId}`

						let htmlCinema = await libs.request_post(urlCinema, {
							"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
							"user-agent": libs.request_getRandomUserAgent()
						}, bodyCinema)

						
						let token = htmlCinema.match(/token *\= *\"([^\"]+)/i)
						token = token ? token[1] : "";
						let parseCinema = cheerio.load(htmlCinema)
						let sourceCinema = []

						parseCinema(".item").each((keyCinema, itemCinema) => {
							let server = parseCinema(itemCinema).attr("data-server")
							sourceCinema.push(`${loadSource}?server=${server}&token=${token}`)
						})

						console.log(sourceCinema, "------------- CINEBLOOM SOURCE CINEMA EMBED ---------")
						let arrCinema = sourceCinema.map(async (itemCinema) => {
							let htmlLoadSource = await libs.request_get(itemCinema, {})
							let parseLoadSource = cheerio.load(htmlLoadSource)
							let iframeLoadSource = parseLoadSource("iframe").attr("src")
							if (iframeLoadSource) {
								const host = libs.string_getHost(iframeLoadSource)
								if (hosts[host]) {
									hosts[host](iframeLoadSource, movieInfo, _.merge(config, {provider: "CINEBLOOM"}), callback)
								}
							}
							
						})
						await Promise.all(arrCinema)
					} else {
						const fileSize = await libs.request_getFileSize(embed)
						const host = libs.string_getHost(embed)

						console.log(embed, fileSize, host, "embed--------------------")
						if (fileSize == 0) {
						
							if (hosts[host]) {
								hosts[host](embed, movieInfo, _.merge(config, {provider: "CineBloom"}), callback)
							}
						} else {
							callback({
								file: embed,
								size: fileSize,
								host: host.toUpperCase(),
								provider: "CineBloom"
							})
						}
					}
					
				}
				
				
				
			})
			await Promise.all(arrMap)
		}

		if (movieInfo.type == "tv") {
			let linkTv = []
			console.log(parseDetail(".season").length, "--------------- CINEBLOOM SEASON -----------")
			parseDetail(".season").each((keySeason, itemSeason) => {
				let season = parseDetail(itemSeason).find(".title").text()
				season = season.toLowerCase().match(/season *([0-9]+)/i)
				season = season ? season[1] : 0

				console.log(season, movieInfo.season, "--------------- CINEBLOOM SEASON INFO -----------")
				if (season == movieInfo.season) {

					console.log(parseDetail(itemSeason).length, "--------------- CINEBLOOM episode -----------")
					parseDetail(itemSeason).find(".episodes li").each((keyEpisode, itemEpisode) => {
						let episode = parseDetail(itemEpisode).find("h5").text()
						episode = episode.toLowerCase().match(/ep *([0-9]+)/i)
						episode = episode ? episode[1] : 0

						console.log(episode, movieInfo.episode, "--------------- CINEBLOOM episode info -----------")
						if (episode == movieInfo.episode) {
							parseDetail(itemEpisode).find(".streams-list li").each((keyS, itemS) => {
								let hrefTv = parseDetail(itemS).find("a").attr("href")
								linkTv.push(hrefTv)
							})
						}
					})
				}
			})
			
			console.log(linkTv, "--------------- CINEBLOOM episode embed link -----------")
			let arrMap = linkTv.map(async (embed) => {

				if (embed) {
					console.log(embed, embed.toLowerCase().trim().indexOf("cinebloom") != -1, "--------- CINEBLOOM ITEM OLOAD ---------")
					if (embed.toLowerCase().trim().indexOf("cinebloom") != -1) {

						let loadSource = "https://oload.party/loadsource.php"
						let parseCinemaEmbed = await libs.request_getcaptcha(embed, {}, "cheerio")
						let urlCinema = parseCinemaEmbed("#playForm").attr("action")
						let bodyCinema = `playID=${playId}`

						let htmlCinema = await libs.request_post(urlCinema, {
							"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
							"user-agent": libs.request_getRandomUserAgent()
						}, bodyCinema)

						
						let token = htmlCinema.match(/token *\= *\"([^\"]+)/i)
						token = token ? token[1] : "";
						let parseCinema = cheerio.load(htmlCinema)
						let sourceCinema = []

						parseCinema(".item").each((keyCinema, itemCinema) => {
							let server = parseCinema(itemCinema).attr("data-server")
							let serverId = parseCinema(itemCinema).attr("data-server-id")
							if(server && serverId) {
								sourceCinema.push(`${loadSource}?server=${server}&id=${serverId}&token=${token}`)
							}
							
						})

						console.log(sourceCinema, "------------- CINEBLOOM SOURCE CINEMA EMBED ---------")
						let arrCinema = sourceCinema.map(async (itemCinema) => {
							let htmlLoadSource = await libs.request_get(itemCinema, {})
							let parseLoadSource = cheerio.load(htmlLoadSource)
							let iframeLoadSource = parseLoadSource("iframe").attr("src")
							if (iframeLoadSource) {
								const host = libs.string_getHost(iframeLoadSource)
								if (hosts[host]) {
									hosts[host](iframeLoadSource, movieInfo, _.merge(config, {provider: "CINEBLOOM"}), callback)
								}
							}
							
						})
						await Promise.all(arrCinema)
					} else {
						const fileSize = await libs.request_getFileSize(embed)
						const host = libs.string_getHost(embed)

						console.log(embed, fileSize, host, "embed--------------------")
						if (fileSize == 0) {
						
							if (hosts[host]) {
								hosts[host](url, movieInfo, _.merge(config, {provider: "CineBloom"}), callback)
							}
						} else {
							callback({
								file: embed,
								size: fileSize,
								host: host.toUpperCase(),
								provider: "CineBloom"
							})
						}
					}
					
				}
				
				
				
			})
			await Promise.all(arrMap)
		}
	}
}