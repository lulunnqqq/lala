// @ts-nocheck

//// https://www.novamovie.net/
// cloudflare
//https://eb2.srtaem.bar/embed/tt1634106?sub=none

source.getResource =  async (movieInfo, config, callback) => {

	let url = `https://www.novamovie.net/?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`	
	let parse = await libs.request_getcaptcha(url, {}, "cheerio")
	let link = ""
	console.log(parse(".movies-list.movies-list-full .ml-item").length, "------------ NOVAMOVIE SEARCH ----------------")
	parse(".movies-list.movies-list-full .ml-item").each((key, item) => {
		let href = parse(item).find(".ml-mask").attr("href")
		let title = parse(item).find(".mli-info h2").text()
		let year = title.match(/\( *([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim()
		let episode = parse(item).find(".lt-eps i").text()
		let season = 0
		if (episode) {
			season = title.toLowerCase().match(/season *([0-9]+)/i)
			season = season ? season[1] : 0
		}
		title = title.toLowerCase().replace(/season *[0-9]+/i, "").trim()

		console.log(href, title, year, season, episode, slugify(movieInfo.title, {lower: true}), slugify(title.trim(), {lower: true}), "---------- NOVAMOVIE SEARCH INFO ---------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie" && year == movieInfo.year) {
				link = href
			}

			if (movieInfo.type == "tv" && season == movieInfo.season && episode == movieInfo.episode) {
				link = href + `-episode-${movieInfo.episode}`
			}
		}
	})

	console.log(link, "------------ NOVAMOVIE LINK -----------")
	if (link != "") {
		let parseDetail = await libs.request_getcaptcha(link, {}, "cheerio")
		let linksEmbed = []

		console.log(parseDetail(".movieplay").length, "------------ NOVAMOVIE EMBED SEARCH -----------")
		parseDetail(".movieplay").each((key, item) => {
			let embed1 = parseDetail(item).find("iframe").attr("data-lazy-src")
			linksEmbed.push(embed1)
		})

		console.log(linksEmbed, "------------ NOVAMOVIE EMBED -----------")
		let arrMap = linksEmbed.map(async (item) => {
			let embed = ""
			if (item.indexOf("novamovie") != -1) {
				let parseEmbed = await libs.request_getcaptcha(`https:${item}`, {}, "cheerio")
				embed = parseEmbed('iframe').attr("src")

				console.log(embed, "embed novamovies--------------------")
			} else {
				embed = item
			}

			const fileSize = await libs.request_getFileSize(embed)
			const host = libs.string_getHost(embed)

			console.log(embed, fileSize, host, "embed--------------------")
			if (fileSize == 0) {
			
				if (hosts[host]) {
					hosts[host](embed, movieInfo, _.merge(config, {provider: "NOVAMOVIE"}), callback)
				}
			} else {
				callback({
					file: embed,
					size: fileSize,
					host: host.toUpperCase(),
					provider: "NOVAMOVIE"
				})
			}
		})
		await Promise.all(arrMap)
	}
}