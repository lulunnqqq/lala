// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const url = `https://api.movieshd.tv/api/v1/cautare/nuxt?q=${slugify(movieInfo.title.toLowerCase().trim(), {lower: true, replacement: "+"})}&limit=100&lo=0`
	// const body = qs.stringify({
	// 	q: movieInfo.title,
	// 	limit: 100,
	// 	lo: 0
	// })
	const headers = {
		"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		// referer: "https://flixanity.app/films",
		authorization: "Bearer false",
		'user-agent': libs.request_getRandomUserAgent(),
		"x-requested-with": "XMLHttpRequest"
	}

	const resultSearch = await libs.request_get(url, {}, "json")
	const link = ""
	// resultSearch = resultSearch ? resultSearch : []

	console.log(resultSearch, headers, "------------ FLIXIANTIY SEARCH INFO ----------")
	for(let item in resultSearch) {
		let title = resultSearch[item].title
		let year = resultSearch[item].year ? resultSearch[item].year : 0
		let href = `https://flixanity.app${resultSearch[item].permalink}`
		let type = resultSearch[item].type;

		console.log(title, year, href, "------------ FLIXIANTIY INFO ----------")
		if (slugify(movieInfo.title, {lower: true, remove: /[*+~.()'"!:@]/g}) == slugify(title.trim(), {lower: true, remove: /[*+~.()'"!:@]/g})) {
			
			if (movieInfo.type == "movie" && type.toLowerCase() == "movie") {
				if (year == movieInfo.year) {
					link = href;
					break;
				}
			} 
			if (movieInfo.type == "tv"  && type.toLowerCase() == "show") {
				link = href;
				break;
			}
		}
	}

	console.log(link, "------------ FLIXIANTIY link ----------")
	if (link != "") {
		let urlDetail = "https://flixanity.org/ajax/vsozrflxcw.php"
		if (movieInfo.type == "tv") {
			link = `${link}/season/${movieInfo.season}/episode/${movieInfo.episode}`	
		} 
		let htmlDetail = await libs.request_get(link, headers)

		let id = htmlDetail.match(/elid *\= *\"([^\"]+)/i)
		id = id ? id[1] : "";
		let bodyDetail = qs.stringify({
			action: movieInfo.type == "movie" ? "getMovieEmb" : "getEpisodeEmb",
			idEl: id,
			nopop: ""
		})


		console.log(id, bodyDetail, urlDetail,link, headers, "------------ FLIXIANTIY SEARCH DETAIL ----------")
		let resultDetail = await libs.request_post(urlDetail, headers, bodyDetail, "json")
		let embeds = []

		console.log(resultDetail, "------------ FLIXIANTIY RESULT SEARCH DETAIL ----------")

		for (const item in resultDetail) {
			try {
				let html = resultDetail[item].embed
				let parseEmbed = cheerio.load(html)
				let src = parseEmbed("iframe").attr("src")
				if (src) {
					embeds.push(src)
				}
			} catch(e) {}
		}

		console.log(embeds, "------------ FLIXIANTIY LIST EMBEDS ----------")
		let arrMap = embeds.map(async (embed) => {
			if (embed) {
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (fileSize == 0) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "Flixianity"}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "Flixianity"
					})
				}
			}
		})
		await Promise.all(arrMap)
	}
}
