// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const domain = `http://m4ufree.tv`;
	const urlSearch = `${domain}/search/${slugify(movieInfo.title, {lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g})}.html`
	const resultSearch = await libs.request_get(urlSearch, {})
	let parseSearch = cheerio.load(resultSearch)

	let link = ""

	console.log(parseSearch("div.imagecover"), urlSearch, "--------- M4uFREE SEARCH ---------")
	parseSearch("div.imagecover").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find("a").attr("title");
		if (title) {
			let year = title.match(/\( *([0-9]+)/i)
			year = year ? year[1] : 0
			title = title.replace(/\( *[0-9]+ *\)/i, "").trim()
			let href = parseSearch(itemSearch).find("a").attr("href")

			console.log(title, year, href, "--------- M4uFREE SEARCH INFO ---------")
			if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

				if (movieInfo.type == "movie" && year == movieInfo.year) {
					link = href
				} 
				if (movieInfo.type == 'tv') {
					link = href;
				}
			}
		}
	})

	console.log(link, "--------- M4uFREE LINK ---------")
	if (link != "") {
		link = `${domain}/${link}`
		let ajaxUrl = `${domain}/ajax`
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
			let ajaxTv = `${domain}/ajaxtv`
			let idTv = ""

			console.log(parseDetail(".episode").length, "--------- M4uFREE SEARCH EPISODE TV ---------")
			parseDetail(".episode").each((keyTv, itemTv) => {
				let textTv = parseDetail(itemTv).text()
				let matchTv = textTv.toLowerCase().match(/s *([0-9]+) *\- *e([0-9]+)/i)
				let season = matchTv ? matchTv[1] : 0
				let episode = matchTv ? matchTv[2] : 0
				let idEpisode = parseDetail(itemTv).attr("idepisode")

				console.log(season, episode, "--------- M4uFREE SEASON, EPISODE ---------")
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

				console.log(parseTv(".singlemv").length, "--------- M4uFREE TOKEN TV ---------")
				parseTv(".singlemv").each((keyDetail, itemDetail) => {
					let id = parseTv(itemDetail).attr("data")
					tokens.push(id)
				})
			}
		} else {

			console.log(parseDetail(".singlemv").length, "--------- M4uFREE TOKEN MOVIE ---------")
			parseDetail(".singlemv").each((keyDetail, itemDetail) => {
				let id = parseDetail(itemDetail).attr("data")
				tokens.push(id)
			})
		}
		

		let arrMap = tokens.map(async (idFilm) => {
			let body = qs.stringify({
				m4u: idFilm,
				_token: 'IIcmtyiI5J4O9Ag2BTFa14WecGOdlFmIY5O61M3C' 
			})
			// let body = `m4u=DgEXCRxPSVoHCwYDA1sEFgASChBNGgAYSRMKFQpaAlpSFQETAT02NgYcPD4STQslCkApCjBGIDFbGDoPFRgANyNaEBwGDhMbDgQ%3D&_token=viHwed33O5KG83BhdleCYfJqdTKNCYla3PfFrOUL`
			
			let htmlEmbed = await libs.request_post(ajaxUrl, headers, body)
			let parseEmbed = cheerio.load(htmlEmbed)
			let iframe = parseEmbed("iframe.video").attr("src")


			if (iframe) {
				const host = libs.string_getHost(iframe)
				console.log(ajaxUrl, host, headers, body, iframe, "--------- M4UFREE IFRAME AJAX ----------");
				if (hosts[host]) {
					hosts[host](iframe, movieInfo, _.merge(config, {provider: "M4uFree"}), callback)
				}
			}

			console.log(htmlEmbed, headers, body, ajaxUrl, "--------- M4uFREE htmlEmbed parse ---------")
			let source = htmlEmbed.match(/sources *\: *([^\]]+)/i);
			let source2 = source && source[2] ? source[2] + "]" : "[]"
			source = source ? source[1] + "]" : "[]"

			let parse = []
			source = `parse = ${source}`
			eval(source)

			console.log(parse, "--------- M4uFREE PARSE ---------")
			let arrSource = parse.map(async (direct) => {
				const file = direct.file;
				const fileSize = await libs.request_getFileSize(file)	
				const host = libs.string_getHost(file)
				if (fileSize > 0) {
					callback({
						file: file,
						size: fileSize,
						host: host,
						provider: "M4uFree"
					})
				}	
			})
			await Promise.all(arrSource)

			parse = []
			source = `parse = ${source2}`
			eval(source)

			console.log(parse, "--------- M4uFREE PARSE ---------")
			let arrSource = parse.map(async (direct) => {
				const file = direct.file;
				const fileSize = await libs.request_getFileSize(file)	
				const host = libs.string_getHost(file)
				if (fileSize > 0) {
					callback({
						file: file,
						size: fileSize,
						host: host,
						provider: "M4uFree"
					})
				}	
			})
			await Promise.all(arrSource)


		})
		await Promise.all(arrMap)
	}
}
