// @ts-nocheck

//topnow.se


source.topnow_getLink = async (linkIframe1, urlSearch) => {
	let htmlIframe1 = await libs.request_get(linkIframe1, {referer: urlSearch})
	let parseIframe1 = cheerio.load(htmlIframe1)
	let linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	htmlIframe1 = await libs.request_get(linkIframe2, {referer: linkIframe1})
	parseIframe1 = cheerio.load(htmlIframe1)
	linkIframe1 = linkIframe2
	linkIframe2 = parseIframe1("body iframe").attr("src")
	if (linkIframe2.indexOf("http") != -1) {
		return linkIframe2
	} else {
		linkIframe2 = "https://topnow.se" + linkIframe2
	}

	return ""
}

source.getResource = async (movieInfo, config, callback) => {

	
	let urlSearch = "";
	if (movieInfo.type == "movie") {
		urlSearch =  `https://topnow.se/index.php?search=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	} else {
		urlSearch =  `https://topnow.se/index.php?show=${slugify(movieInfo.title, {lower: true, replacement: '-'})}`
	}
	
	let headers = {
		authority: "topnow.se",
		"upgrade-insecure-requests": 1,
		"user-agent": libs.request_getRandomUserAgent(),
		"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
		"sec-fetch-site": "same-origin",
		"sec-fetch-mode": "navigate",
		"sec-fetch-dest": "iframe",
		"referer": "https://topnow.se"
	}
	let htmlSearch = await libs.request_get(urlSearch, headers)
	let parseSearch = cheerio.load(htmlSearch)
	let urlWaiting = `https://topnow.se/please_wait.php?IIlIllI=IlllIIIIIllllIIIIlI&title=`

	let link = ""
	let quality = ""

	console.log(parseSearch(".grid-item .titles").length, movieInfo.year, "---------------- TOPNOW LENGTH ----------------")
	parseSearch(".grid-item .titles").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find("a").text().replace("&nbsp;", "")
		const cloneUrl = title
		let href = parseSearch(itemSearch).find("a").attr("href")
		quality = parseSearch(itemSearch).find(".card_overlay").text()
		quality = quality.match(/Quality *\: *([^\(]+)/i)
		quality = quality ? quality[1].trim() : ""

		let year = title.match(/\( *([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim()

		let season = title.match(/ *S *([0-9]+) *E[0-9]+/i)
		season = season ? season[1] : 0
		let episode = title.match(/ *S *[0-9]+ *E([0-9]+)/i)
		episode = episode ? episode[1] : 0
		title = title.replace(/S[0-9]+E[0-9]+/i, "").trim()

		console.log(title, cloneUrl, href, quality, year, season, episode, "---------------- TOPNOW FILM INFO ----------------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie") {
				if (year == movieInfo.year) {
					// link = urlWaiting + slugify(cloneUrl, {replacement: "%20"})
					link = "https://topnow.se" + href;
				}
			}

			if (movieInfo.type == "tv") {
				if (season == movieInfo.season && episode == movieInfo.episode) {
					// link = urlWaiting + slugify(cloneUrl, {replacement: "%20"})
					link = "https://topnow.se" + href;
				}
			}
		}
	})

	console.log(link, "------------ TOPNOW LINK -----------")
	if (link != "") {
		let htmlDetail = await libs.request_get(link, {referer: urlSearch})
		let linkDownload = "https://topnow.se"
		let param1 = htmlDetail.match(/IllIllllIIIIIlllIl *\= *\"([^\"]+)/i)
		param1 = param1 ? param1[1] : ""
		let param2 = htmlDetail.match(/IlllIIlllllllIIIlI *\= *\"([^\"]+)/i)
		param2 = param2 ? param2[1] : ""
		let param3 = htmlDetail.match(/lIlllIlllllIIlIllI *\= *\"([^\"]+)/i)
		param3 = param3 ? param3[1] : ""
		let linkIframe1 = linkDownload + "/" + param1 + param2 + param3

		console.log(linkIframe1, "------------ TOPNOW SEARCH IFRAME -----------")
		let embed = await source.topnow_getLink(linkIframe1, urlSearch)
		console.log(embed, "------------ TOPNOW RESULT EMBED -----------")
		if (embed != "") {
			const fileSize = await libs.request_getFileSize(embed)
			const host = libs.string_getHost(embed)
			const hostReal = libs.string_getHost(embed, true)

			console.log(embed, fileSize, host, hostReal, "embed--------------------")
			if (!fileSize || embed.indexOf("docs.google") != -1) {
					
				if (hosts[hostReal]) {
					hosts[hostReal](embed, movieInfo, _.merge(config, {provider: "TopNow"}), callback)
				}
			} else {
				callback({
					file: embed,
					size: fileSize,
					host: host.toUpperCase(),
					provider: "TopNow"
				})
			}
		}
	}	
}
