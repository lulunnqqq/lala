// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	if (movieInfo.type == 'movie') {
		return;
	}
	const urlSearch = `https://www.watchepisodes4.com/search/ajax_search?q=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	let resultSearch = await libs.request_get(urlSearch, {}, 'json');
	resultSearch = resultSearch.series ? resultSearch.series : []

	console.log(urlSearch, resultSearch, "--------------- WATCHEPISODE SEARCH INFO -----------")
	let link = '';

	for (let item of resultSearch) {
		let title = item.label;

		if (slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g}) == slugify(title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})) {
			link = item.seo;
		}
	}

	console.log(link, "--------------- WATCHEPISODE LINK -----------")
	if (link != "") {
		link = `https://www.watchepisodes4.com/${link}`
		let linkDetail = "";

		let htmlDetail = await libs.request_get(link)
		let parseDetail = cheerio.load(htmlDetail)

		console.log(link, parseDetail(".el-item").length, "--------------- WATCHEPISODE ITEM SEASON -----------")
		parseDetail(".el-item").each((keyDetail, itemDetail) => {
			let season = parseDetail(itemDetail).find(".season").text();
			season = season.match(/([0-9]+)/i)
			season = season ? season[1] : 0
			let episode =  parseDetail(itemDetail).find(".episode").text();
			episode = episode.match(/([0-9]+)/i)
			episode = episode ? episode[1] : 0

			console.log(season, episode, "--------------- WATCHEPISODE SEASON EPISODE -----------")
			if (season == movieInfo.season && episode == movieInfo.episode) {
				linkDetail = parseDetail(itemDetail).find("a").attr("href");
			}
		})

		console.log(linkDetail, "--------------- WATCHEPISODE LINK DETAIL -----------")
		if (linkDetail != "") {
			let htmlEpisode = await libs.request_get(linkDetail)
			let parseEpisode = cheerio.load(htmlEpisode)

			let sources = [];

			console.log(parseEpisode(".site-link").length, "--------------- WATCHEPISODE SITE LINK LENGTH -----------")
			parseEpisode(".site-link").each((keyEpisode, itemEpisode) => {
				let hrefEpisode = parseEpisode(itemEpisode).attr("href");

				if (hrefEpisode) {
					sources.push(hrefEpisode);	
				}
				
			})


			console.log(sources, "--------------- WATCHEPISODE SOURCES -----------")
			let arrMap = sources.map(async (item) => {
				try {

					let htmlEmbed = await libs.request_get(item);
					let parseEmbed = cheerio.load(htmlEmbed);
					let embed = parseEmbed(".detail-w-button").attr("data-actuallink");
					// let embed = 'https://upstream.to/gemasao45p0y';


					console.log(embed, "--------------- WATCHEPISODE EMBED -----------")
					if (embed) {
						
						const fileSize = await libs.request_getFileSize(embed)
						const host = libs.string_getHost(embed)

						console.log(embed, fileSize, host, "embed--------------------")
						if (!fileSize) {
						
							if (hosts[host]) {
								hosts[host](embed, movieInfo, _.merge(config, {provider: "WatchEpisode"}), callback)
							}
						} else {
							callback({
								file: embed,
								size: fileSize,
								host: host.toUpperCase(),
								provider: "WatchEpisode"
							})
						}
					}
				} catch(e) {}
			})
			await Promise.all(arrMap)
		}
	}
}
