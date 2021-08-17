// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const url = `https://hd15s.com/?s=${slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})}`
	const htmlSearch = await libs.request_get(url)
	const parseSearch = cheerio.load(htmlSearch)

	let link = ""
	console.log(parseSearch(".result-item").length, "-------------- HD15s SEARCH LENGTH ------------")
	parseSearch(".result-item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".details .title a").text()
		let href = parseSearch(itemSearch).find(".details .title a").attr("href")
		let type = parseSearch(itemSearch).find(".movies").text();
		let year = parseSearch(itemSearch).find(".meta .year").text()

		console.log(title, href, type, year , "-------------- HD15s SEARCH INFO ------------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			
			if (movieInfo.type == "movie" && type) {
				if (year == movieInfo.year) {
					link = href;
				}
			} 
			if (movieInfo.type == "tv") {
				link = href
			}
		}
	})

	console.log(link , "-------------- HD15s LINK ------------")
	if (link != "") {
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)

		let linkEmbed = "";

		if (movieInfo.type == "tv") {
			parseDetail(".episodios li").each((keyDetail, itemDetail) => {
				let seasonInfo = parseDetail(itemDetail).find(".numerando").text();
				let season = seasonInfo.match(/([0-9]+)/i)
				season = season ? season[1] : 0
				let episode = seasonInfo.match(/[0-9]+ *\- *([0-9]+)/i)
				episode = episode ? episode[1] : 0

				console.log(season, episode , "-------------- HD15s SEASON EPISODE ------------")
				let href = parseDetail(itemDetail).find(".episodiotitle a").attr("href")

				if (season == movieInfo.season && episode == movieInfo.episode) {
					linkEmbed = href;
				}
			})
		}

		if (movieInfo.type == "movie") {
			linkEmbed = link;
		}

		console.log(linkEmbed , "-------------- HD15s LINK  EMBED ------------")
		if (linkEmbed != "") {
			let htmlEmbed = await libs.request_get(linkEmbed)
			let parseEmbed = cheerio.load(htmlEmbed)

			let sources = []
			let urlAjax = "https://hd15s.com/wp-admin/admin-ajax.php"
			let type = movieInfo.type == "tv" ? 'tv' : "movie"

			console.log(parseEmbed("#playeroptionsul li").length , "-------------- HD15s SEARCH EMBED ------------")
			parseEmbed("#playeroptionsul li").each((keyEmbed, itemEmbed) => {
				let dataPost = parseEmbed(itemEmbed).attr("data-post")
				let dataNume = parseEmbed(itemEmbed).attr("data-nume")

				if (dataPost && dataNume) {
					sources.push({
						post: dataPost,
						nume: dataNume
					})
				}
			})

			console.log(sources , "-------------- HD15s SOURCES ------------")
			let arrMap = sources.map(async (item) => {
				let body = qs.stringify({
					action: 'doo_player_ajax',
					post: item.post,
					nume: item.nume,
					type: type
				})
				let htmlSearchEmbed = await libs.request_post(urlAjax, {
					"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
				}, body)
				let parseSearchEmbed = cheerio.load(htmlSearchEmbed)


				let embed = parseSearchEmbed(".metaframe").attr("src")

				if (embed) {
					console.log(embed, "-------------- HD15s EMBED ------------")
					if (_.startsWith("//")) {
						embed = "https:" + embed
					}
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (fileSize == 0) {
					
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "HD15s"}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "HD15s"
						})
					}
				}

				
			})
			await Promise.all(arrMap)
		}
	}
}
