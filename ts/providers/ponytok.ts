// @ts-nocheck



source.getResource =  async (movieInfo, config, callback) => {

	const domain = `https://ponytok.com`
	const urlSearch = `${domain}/pony_tik/live?query=${slugify(movieInfo.title, {lower: true, replacement:'+'})}`;

	const htmlSearch = await libs.request_get(urlSearch);
	const parseSearch = cheerio.load(htmlSearch);

	let link: string = "";
	console.log(urlSearch, parseSearch('.ss-info').length, '-------- SEARCH INFO PONY ----------');
	parseSearch('.ss-info').each((keySearch, itemSearch) => {
		const title = parseSearch(itemSearch).find('.ss-title').text();
		const href = parseSearch(itemSearch).find('.ss-title').attr('href');
		const type = parseSearch(itemSearch).find('a').last().text();
		let year = parseSearch(itemSearch).find('p').text();
		year = year ? year.toLowerCase().replace(/release *\:/i, '').trim() : 0;


		console.log(title, href, type, year, slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g}), slugify(title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g}), slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g}) == slugify(title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g}), '------------- PONY SEARCH DATA --------');
		if (slugify(movieInfo.title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g}) == slugify(title, {lower: true, replacement: '+', remove: /[*+~.()'"!:@]/g})) {

			if (movieInfo.type == "movie" && (year == movieInfo.year || !year) && type == 'movie') {
				link = `${domain}${href}`;
			}

			if(movieInfo.type == "tv" && year == movieInfo.year && type == 'tv') {
				link = `${domain}${href}`;
			}
		}
	});

	console.log(link, '---------- LINK PONY -------');
	if (!link) {
		return;
	}

	let linkDetail = "";
	if (movieInfo.type == 'tv') {
		const htmlDetailTv = await libs.request_get(link);
		const parseDetailTv = cheerio.load(htmlDetailTv);

		console.log(parseDetailTv(`.season-${movieInfo.season} .btn-eps`).length, '---------- PONY SEARCH LENGTH TV ------')
		parseDetailTv(`.season-${movieInfo.season} .btn-eps`).each((keyTv, itemTv) => {
			let hrefTv = `${domain}/${parseDetailTv(itemTv).attr('href')}`;
			let episode = parseDetailTv(itemTv).text();
			episode = episode ? episode.toLowerCase().replace('episode', "").trim() : 0;

			console.log(hrefTv, episode, '----------- PONY DATA TV ----------')
			if (episode == movieInfo.episode) {
				linkDetail = hrefTv;
			}
		});

		
	} else {
		linkDetail = link;
	}

	let embeds = [];
	if (linkDetail) {
		const htmlDetailEpisode = await libs.request_get(linkDetail);
		const parseDetailEpisode = cheerio.load(htmlDetailEpisode);
		
		console.log(parseDetailEpisode('.player_source').length, linkDetail, '----------- PONY TV LINK DETAIL -------');
		parseDetailEpisode('.player_source').each((keyEpisode, itemEpisode) => {
			let hrefEpisode = parseDetailEpisode(itemEpisode).attr('data-src');
			if (hrefEpisode) {
				embeds.push(hrefEpisode);
			}
		});
	}

	console.log(embeds, '--------- PONY EMVBEDS ------------')
	let arrMap = embeds.map(async (urlDetail) => {

		console.log(urlDetail, urlDetail.indexOf("playm3u8_pony") != -1, "-------- LOOP PONY -------")
		let embed = "";
		if (urlDetail.indexOf("playm3u8_pony") != -1) {
			let res = await libs.request_head(urlDetail, {}, false);
			embed = res && res.url ? res.url : "";
			console.log(res, "--------- RES EMBED PONY ------------")
		} else {
			embed = urlDetail;
		}

		console.log(embed, "------------ Pony PROPER DIRECT EMBED")
		if (embed) {

			
				
			const fileSize = await libs.request_getFileSize(embed)
			const host = libs.string_getHost(embed)

			console.log(embed, fileSize, host, "embed--------------------")
			if (!fileSize) {
			
				if (hosts[host]) {
					hosts[host](embed, movieInfo, _.merge(config, {provider: "PonyTV"}), callback)
				}
			} else {
				callback({
					file: embed,
					size: fileSize,
					host: host.toUpperCase(),
					provider: "PonyTV"
				})
			}
		}
	});
	await Promise.all(arrMap); 
}