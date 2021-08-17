// @ts-nocheck

// https://ymovies.to/?s=Sonic&genre=&years=

source.getResource = async (movieInfo, config, callback) => {

	if (movieInfo.type == "tv") {
		return
	}

	let urlSearch = `https://ymovies.to/?s=${slugify(movieInfo.title, {lower: true, replacement: "+"})}` 
	let parseSearch = await libs.request_getcaptcha(urlSearch, {})

	let links = ""
	parseSearch(".list_item.postlist.row.posts3").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find('.title a').text()
		let year = title.match(/\( *([0-9]+)/i)
		year = year ? year[1] : 0
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim()
		let href = parseSearch(itemSearch).find('.title a').attr('href')

		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

			if (year == movieInfo.year) {
				link = href
			}
		}
	})

	if (link !== '') {
		link += '/watching/'
			
	}
}
