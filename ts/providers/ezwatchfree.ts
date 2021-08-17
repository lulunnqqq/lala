// @ts-nocheck



source.getResource =  async (movieInfo, config, callback) => {


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
	console.log(playId, "--------------- EZWATCHFREE playID ------------")


	if (movieInfo.type == "tv") {
		return;
	}
	let urlSearch = `https://ezwatchfree.com/?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}` 	
	const htmlSearch = await libs.request_get(urlSearch)
	const parseSearch = cheerio.load(htmlSearch)

	let link = "";
	console.log(parseSearch('.result-item').length, "--------------- EZWATCHFREE SEARCH ------------")
	parseSearch('.result-item').each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".title a").text()
		let href = parseSearch(itemSearch).find(".title a").attr("href")
		let year = parseSearch(itemSearch).find('.year').text();

		console.log(title, href, year, "--------------- EZWATCHFREE INFO ------------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (year == movieInfo.year) {
				link = href
			}
		}
	})

	console.log(link, "--------------- EZWATCHFREE LINK ------------")
	if (link != "") {
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)

		let sources = []

		console.log(parseDetail('#playeroptionsul li').length, "--------------- EZWATCHFREE SEARCH EMBED ------------")
		parseDetail('#playeroptionsul li').each((keyDetail, itemDetail) => {
			let embed = parseDetail(itemDetail).attr("data-vs");

			if (embed) {
				sources.push(embed);
			}
			
		})

		console.log(sources, "--------------- EZWATCHFREE LIST EMBED ------------")	

		const arrMap = sources.map(async (embed) => {
			if (embed.toLowerCase().trim().indexOf("ezwatchfree") != -1) {

				
				let loadSource = "https://oload.party/loadsource.php"
				let parseCinemaEmbed = await libs.request_get(embed, {
					"user-agent": libs.request_getRandomUserAgent()
				})

				parseCinemaEmbed = cheerio.load(parseCinemaEmbed);
				let urlCinema = parseCinemaEmbed("#playForm").attr("action")
				let bodyCinema = `playID=${playId}`

				console.log("------- EZWATCHFREE DETECT -----------", embed, urlCinema)

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
					if (server && serverId) {
						sourceCinema.push(`${loadSource}?server=${server}&id=${serverId}&token=${token}`)
					}
				})

				console.log(sourceCinema, "------------- EZWATCHFREE SOURCE CINEMA EMBED ---------")
				let arrCinema = sourceCinema.map(async (itemCinema) => {
					let htmlLoadSource = await libs.request_get(itemCinema, {})
					let parseLoadSource = cheerio.load(htmlLoadSource)
					let iframeLoadSource = parseLoadSource("iframe").attr("src")

					console.log(iframeLoadSource, "------------- EZWATCHFREE EMBED LOAD SOURCE ---------")
					if (iframeLoadSource) {
						const host = libs.string_getHost(iframeLoadSource)
						if (hosts[host]) {
							hosts[host](iframeLoadSource, movieInfo, _.merge(config, {provider: "EzWatchFree"}), callback)
						}
					}
					
				})
				await Promise.all(arrCinema)
			} else {
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (!fileSize) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "EzWatchFree"}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "EzWatchFree"
					})
				}
			}
		}) 
		await Promise.all(arrMap)
	}
}