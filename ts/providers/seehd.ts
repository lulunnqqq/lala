// @ts-nocheck

source.getResource = async (movieInfo, config, callback) => {
	const url = `http://www.seehd.pl/?s=${slugify(movieInfo.title, {lower: true, replacement: "+"})}`;
	const parse = await libs.request_getcaptcha(url, {}, "cheerio")
	let link = ""
	parse(".movie.big").each((key, item) => {
		let title = parse(item).find(".thumb_title").text()
		let href = parse(item).find(".post_thumb a").attr("href")
		let slugTitle = slugify(title, {lower: true, replacement: "-"})
		let slugTileInfo = slugify(movieInfo.title, {lower: true, replacement: "-"})

		if (slugTitle.indexOf(slugTileInfo) !== -1) {
			link = href
		}
	})

	if (link != "") {
		let matchTv = link.match(/\-season\-[0-9]+\-episode\-[0-9]+/i)
		if (movieInfo.type == "tv" && matchTv) {
			let replaceEpisode = `-season-${movieInfo.season}-episode-${movieInfo.episode}`
			link = link.replace(/\-season\-[0-9]+\-episode\-[0-9]+/i, replaceEpisode)
		}

		let sources = []
		let parseDetail = await libs.request_getcaptcha(link, {}, "cheerio")
		parseDetail(".tabcontent iframe").each((keyDetail, itemDetail) => {
			let embed = parseDetail(itemDetail).attr("src") || parseDetail(itemDetail).attr("SRC")
			if (embed) {
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (fileSize == 0) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "SEEHD"}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "SEEHD"
					})
				}
			}
		})
	}
}