// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const urlSearch = `http://them4ufree.info/tag/${slugify(movieInfo.title, {lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g})}`
	const resultSearch = await libs.request_get(urlSearch, {})
	let parseSearch = cheerio.load(resultSearch)

	let link = ""

	console.log(parseSearch(".top-item"), urlSearch, "--------- them4ufree SEARCH ---------")
	parseSearch(".top-item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find("cite").text();
		let year = title.match(/\( *([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim()
		let href = parseSearch(itemSearch).attr("href")

		console.log(title, year, href, "--------- them4ufree SEARCH INFO ---------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

			if (movieInfo.type == "movie" && year == movieInfo.year) {
				link = href
			} 
			if (movieInfo.type == 'tv') {
				link = href;
			}
		}
	})

	console.log(link, "--------- them4ufree LINK ---------")
	if (link != "") {
		let ajaxUrl = "http://them4ufree.info/ajax"
		let linkTv = ''

		let htmlDetail = await libs.request_get(link, {})
		let parseDetail = cheerio.load(htmlDetail)
		let tokens = []
		let token = htmlDetail.match(/_token *: *\'([^\']+)/i)
		token = token ? token[1] : ''

		let headers = {
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		}

		if (movieInfo.type == "tv") {
			let ajaxTv = "http://them4ufree.info/ajaxtv"
			let idTv = ""

			console.log(parseDetail(".episode").length, "--------- them4ufree SEARCH EPISODE TV ---------")
			parseDetail(".episode").each((keyTv, itemTv) => {
				let textTv = parseDetail(itemTv).text()
				let matchTv = textTv.toLowerCase().match(/s *([0-9]+) *\- *e([0-9]+)/i)
				let season = matchTv ? matchTv[1] : 0
				let episode = matchTv ? matchTv[2] : 0
				let idEpisode = parseDetail(itemTv).attr("idepisode")

				console.log(season, episode, "--------- them4ufree SEASON, EPISODE ---------")
				if (season == movieInfo.season && episode == movieInfo.episode) {
					idTv = idEpisode
				}
			})
			if (idTv) {
				let bodyTv = qs.stringify({
					idepisode: idTv,
					_token: token
				})
				let htmlTv = await libs.request_post(ajaxTv, headers, bodyTv)
				let parseTv = cheerio.load(htmlTv)

				console.log(parseTv(".singlemv").length, "--------- them4ufree TOKEN TV ---------")
				parseTv(".singlemv").each((keyDetail, itemDetail) => {
					let id = parseTv(itemDetail).attr("data")
					tokens.push(id)
				})
			}
		} else {

			console.log(parseDetail(".singlemv").length, "--------- them4ufree TOKEN MOVIE ---------")
			parseDetail(".singlemv").each((keyDetail, itemDetail) => {
				let id = parseDetail(itemDetail).attr("data")
				tokens.push(id)
			})
		}
		

		let arrMap = tokens.map(async (idFilm) => {
			let body = qs.stringify({
				m4u: idFilm,
				_token: token
			})
			// let body = `m4u=DgEXCRxPSVoHCwYDA1sEFgASChBNGgAYSRMKFQpaAlpSFQETAT02NgYcPD4STQslCkApCjBGIDFbGDoPFRgANyNaEBwGDhMbDgQ%3D&_token=viHwed33O5KG83BhdleCYfJqdTKNCYla3PfFrOUL`
			
			let htmlEmbed = await libs.request_post(ajaxUrl, headers, body)
			let parseEmbed = cheerio.load(htmlEmbed)
			let iframe = parseEmbed("iframe.video").attr("src")
			if (iframe) {
				const host = libs.string_getHost(iframe)
				if (hosts[host]) {
					hosts[host](iframe, movieInfo, _.merge(config, {provider: "THEM4UFREE"}), callback)
				}
			}

			console.log(htmlEmbed, headers, body, ajaxUrl, "--------- THEM4UFREE htmlEmbed parse ---------")
			let source = htmlEmbed.match(/sources *\: *([^\]]+)/i);
			let source2 = source && source[2] ? source[2] + "]" : "[]"
			source = source ? source[1] + "]" : "[]"

			let parse = []
			source = `parse = ${source}`
			eval(source)

			console.log(parse, "--------- THEM4UFREE PARSE ---------")
			let arrSource = parse.map(async (direct) => {
				const file = direct.file;
				const fileSize = await libs.request_getFileSize(file)	
				const host = libs.string_getHost(file)
				if (fileSize > 0) {
					callback({
						file: file,
						size: fileSize,
						host: host,
						provider: "TheM4uFree"
					})
				}	
			})
			await Promise.all(arrSource)

			parse = []
			source = `parse = ${source2}`
			eval(source)

			console.log(parse, "--------- THEM4UFREE PARSE ---------")
			let arrSource = parse.map(async (direct) => {
				const file = direct.file;
				const fileSize = await libs.request_getFileSize(file)	
				const host = libs.string_getHost(file)
				if (fileSize > 0) {
					callback({
						file: file,
						size: fileSize,
						host: host,
						provider: "TheM4uFree"
					})
				}	
			})
			await Promise.all(arrSource)


		})
		await Promise.all(arrMap)
	}
}
