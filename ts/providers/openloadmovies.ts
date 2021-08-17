// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	if (movieInfo.type == "tv") {
		return
	}

	let urlSearch = `https://openloadmovies.ch/?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	let htmlSearch = await libs.request_get(urlSearch)
	let parseSearch = cheerio.load(htmlSearch)
	let link = ""

	console.log(parseSearch(".result-item").length, urlSearch, '------------ OPENLOAD MOVIE SEARCH LENGTH --------');
	parseSearch(".result-item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find('.title a').text()
		let href = parseSearch(itemSearch).find('.title a').attr('href')
		let year = title.match(/\( *([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim()

		console.log(title, href, year, "-------------- OPENLOAD MOVIE SEARCH INFO -----------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
    
			if (year == movieInfo.year) {
				link = href
			}
		}
	})

	console.log(link, '--------------- OPENLOAD MOVIE LINK ----------')
	if (link != "") {
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)

		let sources = []

		console.log(parseDetail('.dooplay_player_option').length, "---------------- OPENLOAD LENGTH DETAIL -----------")
		parseDetail('.dooplay_player_option').each((keyDetail, itemDetail) => {
			let type = parseDetail(itemDetail).attr("data-type")
			let post = parseDetail(itemDetail).attr('data-post')
			let nume = parseDetail(itemDetail).attr("data-nume")

			console.log(type, post, nume, "---------------- OPENLOAD TYPE POST NUME ")
			if (nume.toLowerCase() != "trailer") {
				sources.push({
					type,
					post,
					nume
				})
			}
			
		})
		let urlAjax = "https://openloadmovies.ch/wp-admin/admin-ajax.php"
		let maps = sources.map(async (item) => {
			let body = {
				action: "doo_player_ajax",
				post: item.post,
				nume: item.nume,
				type: item.type
			}

			console.log(urlAjax, body, "------------- OPENLOAD MOVIE request POST");
			let result = await libs.request_post(urlAjax, {
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
			},  qs.stringify(body), 'json')
			// let parseIframe = cheerio.load(result)
			// let  embed = parseIframe("iframe").attr("src")	
			let embed = result.embed_url;

			console.log(embed, result, "embed xxxxxxxxx--------------------")
			if (embed) {
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (fileSize == 0) {
						
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "OpenloadMovies", urlDetail: link}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "OpenloadMovies"
					})
				}
			}
			

		})
		await Promise.all(maps)
	}
}
