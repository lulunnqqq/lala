// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	const domain = `https://watchserieshd.co`;
	const urlSearch = `${domain}/ajax/suggest_search?keyword=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`

	console.log(urlSearch, '--------------- WATCHSERIESHD URL SEARCH ----------');
	let jsonSearch = await libs.request_get(urlSearch, {
		accept: "application/json, text/javascript, */*; q=0.01",
		"user-agent": libs.request_getRandomUserAgent(),
		"x-requested-with": "XMLHttpRequest",
		"sec-fetch-site": "same-origin",
		host: "watchserieshd.co"
	}, 'json');

	console.log(jsonSearch, 'jsonSearch');
	jsonSearch = jsonSearch.content ? jsonSearch.content : "";
	if (!jsonSearch) {
		return;
	}
	const parseSearch = cheerio.load(jsonSearch);

	let link = "";

	console.log(parseSearch('ul li').length, '-------------- WATCHSERIESHD SEARCH LENGTH -------')
	parseSearch('ul li').each((keySearch, itemSearch) => {

		let title = parseSearch(itemSearch).find('.ss-title').text();
		title = title.trim().toLowerCase();

		let href = parseSearch(itemSearch).find('.ss-title').attr('href');
		if (href) {
			href = domain + href;
		}
		let season = title.match(/ *\- *season *([0-9]+)/i)
		season = season ? season[1] : 0;
		title = title.replace(/ *\- *season *[0-9]+/, '').trim();

		console.log(title, href, season, '----------------- WATCHSERIESHD INFO -----------');
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (!season && movieInfo.type == 'movie') {
				link = href;
			} else if(season && movieInfo.type == 'tv' && season == movieInfo.season) {
				link = href;
			}
		}
		
	})

	console.log(link, '----------------- WATCHSERIESHD LINK -----------');
	if (link) {
		link = link + `/watching.html?ep=${movieInfo.type == 'movie' ? 0 : movieInfo.episode}`;

		console.log(link, '----------------- WATCHSERIESHD LINK CUSTOM -----------');
		let htmlEmbed = await libs.request_get(link);
		let parseEmbed = cheerio.load(htmlEmbed);

		let embeds = [];

		console.log(parseEmbed('.btn-eps').length, '----------------- WATCHSERIESHD EMBED LENGTH -----------');
		parseEmbed('.btn-eps').each((keyEmbed, itemEmbed) => {
			let urlEmbed = parseEmbed(itemEmbed).attr("player-data");

			if (urlEmbed) {
				if (_.startsWith(urlEmbed, "/")) {
					urlEmbed = "https:" + urlEmbed;
				}

				embeds.push(urlEmbed);
			}
		});

		console.log(embeds, '----------------- WATCHSERIESHD EMBEDS -----------');
		let arrMap = embeds.map(async (embed) => {
			if (embed) {
				
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (fileSize == 0) {
						
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "WatchSeriesHD", urlDetail: link}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "WatchSeriesHD"
					})
				}
			}
		})
	}
}
