// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const urlSearch = `https://vikv.net/?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`;
	const htmlSearch = await libs.request_get(urlSearch);
	const parseSearch = await cheerio.load(htmlSearch);
	
	let link = "";	
	console.log(parseSearch(".nag.cf .item").length, "------------ VIKV SEARCH LENGTH ---------")	
	parseSearch(".nag.cf .item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".entry-title a").text();
		let year = title.match(/\( *([0-9]+)/i)
		year = year ? year[1] : 0;
		title = title.replace(/\( *[0-9]+ *\)/i, '');
		title = title.toLowerCase().replace(/s[0-9]+ *e[0-9]+.*/i, '');
		const href = parseSearch(itemSearch).find(".entry-title a").attr("href");

		const tvInfo = href.toLowerCase().match(/\-s([0-9]+)-e([0-9]+)/i)
		const season = tvInfo && tvInfo[1];
		const episode = tvInfo && tvInfo[2];

		console.log(title, href, tvInfo, season, episode, "------------ VIKV SEARCH INFO ---------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {

			if (movieInfo.type == "movie" && !season && !episode && (!year || year == movieInfo.year)) {
				link = href;
			}
			if (movieInfo.type == "tv" && season == movieInfo.season && episode == movieInfo.episode) {
				link = href;
			}
		} 
	})
	console.log(link, "------------ VIKV link ---------")	
	if (link != "") {
		let htmlDetail = await libs.request_get(link);
		let parseDetail = cheerio.load(htmlDetail);

		let iframe = parseDetail("iframe[allow=autoplay]").attr("src");

		console.log(iframe, "------------ VIKV IFRAME ---------")	
		if (iframe) {
			let imdbid = iframe.match(/embed\/([A-z0-9]+)/i);
			imdbid = imdbid ? imdbid[1] : '';
			console.log(imdbid, "------------ VIKV IMDBID ---------")	

			if (imdbid) {
				let body = qs.stringify({
					imdb: imdbid,
					ip: '',
					hd: false,
				})
				let headers = {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
				let urlEmbed = `https://eb2.srtaem.casa/l1`;

				let resultEmbed = await libs.request_post(urlEmbed, headers, body, 'json');

				console.log(body, headers, urlEmbed, resultEmbed, "------------ VIKV EMBED AJAX ---------")	
				resultEmbed = resultEmbed ? resultEmbed : [];

				let arrMap = resultEmbed.map(async (itemEmbed) => {

					let embeds = itemEmbed.src ? itemEmbed.src : [];
					let arrMapEmbed = embeds.map(async (embedInfo) => {
						let embed = embedInfo.src;
						if (embed) {
							const fileSize = await libs.request_getFileSize(embed)
							const host = libs.string_getHost(embed)

							console.log(embed, fileSize, host, "embed--------------------")
							if (fileSize == 0) {
							
								if (hosts[host]) {
									hosts[host](embed, movieInfo, _.merge(config, {provider: "VIKV"}), callback)
								}
							} else {
								callback({
									file: embed,
									size: fileSize,
									host: host.toUpperCase(),
									provider: "VIKV",
									quality: embedInfo.res,
								})
							}
						}
					});
					await Promise.all(arrMapEmbed)
				})
				await Promise.all(arrMap);
			}
		}
	}
}	
