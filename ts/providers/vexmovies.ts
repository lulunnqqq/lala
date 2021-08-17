// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	if (movieInfo.type == "tv") {
		return
	}

	let urlSearch = `http://vexmovies.org/?s=${slugify(movie.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})}`
	let htmlSearch = await libs.request_get(urlSearch)
	let parseSearch = cheerio.load(htmlSearch)

	let link = "";
	parseSearch(".item").each((keySearch, itemSearch) => {
		let href = parseSearch(itemSearch).find("a").first().attr("href")
		let title = parseSearch(itemSearch).find(".fixyear h2").text();

		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

			if (movieInfo.type == "movie") {
				link = href
			} 
		}
	})

	if (link != "") {
		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)
		
	}
}
