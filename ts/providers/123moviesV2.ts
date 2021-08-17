// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	let headers = {
		// authority: 'ww3.123movies.la',
		// accept: "application/json, text/javascript, */*; q=0.01",
		// "user-agent": libs.request_getRandomUserAgent(),
		"x-requested-with": "XMLHttpRequest",
		"sec-fetch-site": "same-origin",
		// "sec-fetch-mode": "cors",
		// "sec-fetch-dest": "empty",
		// "Access-Control-Allow-Origin": "*",
		referer: "",
		cookie: ""
	}
	let urlSearch = `https://ww3.123movies.la/search/${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	let htmlSearch = await libs.request_get(urlSearch)
	let parseSearch = cheerio.load(htmlSearch)

	let link = "";

	console.log(parseSearch(".ml-item").length, "-------- 123MOVIESV2 SEARCH --------")
	parseSearch(".ml-item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".mli-info h2").text()
		let href = parseSearch(itemSearch).find(".ml-mask.jt").attr("href");
		let quality = parseSearch(itemSearch).find(".mli-quality").text()

		console.log(title, href, quality, "-------- 123MOVIESV2 SEARCH INFO --------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			link = href;
		}
	})

	console.log(link, "-------- 123MOVIESV2 LINK --------")
	if (link != "") {
		if (movieInfo.type == "tv") {
			link += `/s${movieInfo.season}/watching.html`
		} else {
			link += `/watching.html`
		}

		headers.referer = link;
		headers.cookie = await libs.request_getCookie(headers.referer)

		let ids = [];
		console.log(link, "-------- 123MOVIESV2 LINK WATCHING --------")
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)
		let idEmbed = htmlDetail.match(/id *: *\"([^\"]+)/i)
		idEmbed = idEmbed ? idEmbed[1].trim() : "";

		console.log(idEmbed, "-------- 123MOVIESV2 ID EMBED --------")
		let urlGetEpisode = `https://ww3.123movies.la/ajax/v2_get_episodes/${idEmbed}`
		htmlDetail = await libs.request_get(urlGetEpisode, headers)
		parseDetail = cheerio.load(htmlDetail)
		
		if(movieInfo.type == "movie") {

			console.log(parseDetail(".btn-eps.first-ep.last-ep").length, "-------- 123MOVIESV2 DETAIL LENGTH --------")
   			parseDetail(".btn-eps.first-ep.last-ep").each((keyDetail, itemDetail) => {
   				let href = parseDetail(itemDetail).attr("href")
   				let id = parseDetail(itemDetail).attr("episode-id")
   				if(href.toLowerCase().indexOf("intro") == -1) {
   					ids.push(id)
   				}
   			})
		} else {

			console.log(parseDetail(".btn-eps.first-ep").length, "-------- 123MOVIESV2 DETAIL LENGTH TV --------")
			parseDetail(".btn-eps.first-ep").each((keyDetail, itemDetail) => {
   				let href = parseDetail(itemDetail).attr("href")
   				let id = parseDetail(itemDetail).attr("episode-id")
   				let episode = parseDetail(itemDetail).text()
   				episode = episode.toLowerCase().match(/episode *([0-9]+)/i)
   				episode = episode ? episode[1] : 0
   				if(href.toLowerCase().indexOf("intro") == -1 && movieInfo.episode == episode) {
   					ids.push(id)
   				}
   			})
		}

		console.log(ids, "-------- 123MOVIESV2 IDS --------")
		let urlAjax = `https://ww3.123movies.la/ajax/load_embed/`
		let arrMap = ids.map(async (id) => {
			let result = await libs.request_get(`${urlAjax}${id}`, headers, 'json')
			console.log(result, headers, `${urlAjax}${id}`, "--------------- 123MOVIESV2 URLAJAX EmBED--------")
			if (result.status == 1) {
				let embed = result.embed_url;


				if (embed) {
					const fileSize = await libs.request_getFileSize(embed)
					const host = libs.string_getHost(embed)

					console.log(embed, fileSize, host, "embed--------------------")
					if (fileSize == 0) {
					
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "MoviesBlueray"}), callback)
						}
					} else {
						callback({
							file: embed,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "MoviesBlueray"
						})
					}
				}
				
			}
		})
		await Promise.all(arrMap)
	}
}
