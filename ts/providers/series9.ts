// @ts-nocheck

// http://www8.series9.to/


source.getResource = async (movieInfo, config, callback) => {
	const url = `https://api.ocloud.stream/series/ajax/suggest_search?keyword=${slugify(movieInfo.title, {lower: true, replacement: "+"})}&img=%2F%2Fcdn.themovieseries.net%2F&link_web=https%3A%2F%2Fwww8.series9.to%2F`
	let searchResult = await libs.request_get(url, {}, "json")
	searchResult = searchResult.content
	let parse = cheerio.load(searchResult)
	let link = ""
	parse("a").each( (key, item) => {
		let title = parse(item).text()
		let href = parse(item).attr("href")
		let season = title.toLowerCase().match(/season *([0-9]+)/i)
		season = season ? season[1] : 0
		title = title.toLowerCase().replace(/\- *season *[0-9]+/i, "").trim()

		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

			if (movieInfo.type == "movie") {
				link = href
			}
			if (movieInfo.type == "tv" && season == movieInfo.season) {
				link = href
			}
		}
	})

	if (link != "") {
		let parseDetail = await libs.request_getcaptcha(link, {}, "cheerio", "sources_clouflare")
		let sources = []
		parseDetail("a.btn-eps").each((key, item) => {
			let href = parseDetail(item).attr("href")
			sources.push(href)
		})

		let arrMap = sources.map(async (embed) => {
			if (embed) {
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (fileSize == 0) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "SERIES9"}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "SERIES9"
					})
				}
			}
		})
		await Promise.all(arrMap)
	}
}