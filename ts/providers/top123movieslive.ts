// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	let urlSearch = `https://ww1.top123movieslive.com/?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	let htmlSearch  = await libs.request_get(urlSearch)
	let parseSearch = cheerio.load(htmlSearch)

	let link = ""

	console.log(parseSearch(".ml-item").length, "-------- TOP123 SEARCH INFO -------")
	parseSearch(".ml-item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".mli-info h2").text()
		let season = title.toLowerCase().match(/\– *season *([0-9]+)/i)
		season = season ? season[1] : 0
		title = title.toLowerCase().replace(/\– *season [0-9]+/i, "").trim()
		let href = parseSearch(itemSearch).find(".ml-mask.jt").attr("href")


		console.log(title, season, href, "-------- TOP123 DETAIL INFO -------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie") {
				link = href
			}

			if (movieInfo.type == "tv" && season == movieInfo.season) {
				link = href
			}
		}
	})

	console.log(link, "-------- TOP123 DETAIL INFO -------")
	if (link) {
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)
		let headers = {
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		}

		let nonce = htmlDetail.match(/nonce\s*\:\s*\'([^'^]+)/i)
		nonce = nonce ? nonce[1] : ""
		let urlEmbed = `https://ww1.top123movieslive.com/wp-admin/admin-ajax.php`
		let body = {
			action: "halim_ajax_player",
			nonce,
			episode: 0,
			server: 0,
			postid: 0
		}
		if(movieInfo.type == "movie") {
			body.postid = parseDetail(".idTabs li").first().find("a span").attr("data-post-id");
			body.server = parseDetail(".idTabs li").first().find("a span").attr("data-server");
			body.episode = parseDetail(".idTabs li").first().find("a span").attr("data-episode");

			console.log(body, parseDetail(".idTabs li").first().find("a span").attr("data-post-id"), "---------- TOP123MOVIE BODY MOVIES ----------")
		} else {
			parseDetail(".idTabs li").each((keyEpisode, itemEpisode) => {

				parseDetail(itemEpisode).find("a").each((keyId, itemId) => {
					let episode = parseDetail(itemId).find("span").text();

					console.log(episode, movieInfo.episode, "-------- TOPMOVIES EPISODE ID --------")
					if (episode == movieInfo.episode) {
						body.postid = parseDetail(itemId).find("span").attr("data-post-id");
						body.server = parseDetail(itemId).find("span").attr("data-server");
						body.episode = parseDetail(itemId).find("span").attr("data-episode");
					}
				})
				
			})
		}


		let htmlEmbed = await libs.request_post(urlEmbed, headers, qs.stringify(body))

		console.log(body, urlEmbed, "---------- TOP123MOVIE HTML EMBED ----------")
		let sources = [];
		let dataEmbed = htmlEmbed.match(/var *vb_json_data *\= *\'([^\']+)/i)
		eval(`sources = ${dataEmbed ? dataEmbed[1] : "[]"}`)

		console.log(sources, "-------- TOP123 EMBED -------")

		sources = sources[1] ? sources[1] : []
		let arrMap = sources.map(async (embed) => {
			if (embed.s && embed.u) {
				let decode = libs.string_base64_decode(embed.u)
				if (embed.s.toLowerCase() == "hls") {

				} else {
					const fileSize = await libs.request_getFileSize(decode)
					const host = libs.string_getHost(decode)

					console.log(decode, fileSize, host, "embed.u--------------------")
					if (fileSize == 0) {
							
						if (hosts[host]) {
							hosts[host](decode, movieInfo, _.merge(config, {provider: "TopMovies", urlDetail: link}), callback)
						}
					} else {
						callback({
							file: decode,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "TopMovies"
						})
					}
				}
			}
		})
		await Promise.all(arrMap)
	}
}
