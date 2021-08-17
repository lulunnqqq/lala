// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {
	const domain = `https://www.putlockers.gg`
	const url = `${domain}/search/${slugify(movieInfo.title, {lower: true, replacement: '%20', remove: /[*+~.()'"!:@]/g})}`
	let htmlSearch = await libs.request_get(url);	
	let parseSearch = cheerio.load(htmlSearch);

	let link = "";
	let searchInfos = [];

	console.log(url, parseSearch('.ml-mask').length, '------ PUTLOCKER-CR Search INfo ------');
	parseSearch('.ml-mask').each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find('.mli-info h2').text();
		const season = title.match(/\- *season *([0-9]+)/i);
		season = season ? season[1] : 0;
		if (season) {
			title = title.replace(/\- *season *[0-9]+/i, '').trim();
		}
		let movieId = parseSearch(itemSearch).attr('data-id');

		console.log(title, season, movieId, '------ PUTLOCKER-CR Movie Info');
		if (movieId) {
			if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
				
				if (movieInfo.type == 'tv' && season == movieInfo.season) {
					searchInfos.push(movieId);
				} else {
					searchInfos.push(movieId)
				}
			}
		}
	});

	console.log(searchInfos, '------- PUTLOCKER_CR Search Info ------');

	let arrMovieMap = searchInfos.map(async (id) => {
		let urlSearchInfo = `${domain}/movie_get_info/${id}`;
		const dataSearchResponse = await libs.request_get(urlSearchInfo, {}, 'json');
		const year = dataSearchResponse.data ? dataSearchResponse.data.release : '';
		const href = dataSearchResponse.data ? dataSearchResponse.data.link_url : '';
		console.log(dataSearchResponse, '----- PUTLOCKER DATA SEARCH RESPONSE ----');

		console.log(urlSearchInfo, year, href, '------- PUTLOCKER MOVIE ------');
		if (movieInfo.type == 'movie' && year == movieInfo.year) {
			link = href;
		} else {
			link = href;
		}
	});
	await Promise.all(arrMovieMap);

	console.log(link, '----- PUTLOCKER-CR LINK');

	if (!link) {
		return;
	}
	link = `${domain}${link}`;

	const detailHtml = await libs.request_get(link);
	const parseDetailHtml = cheerio.load(detailHtml);

	let embeds = [];
	if (movieInfo.type == 'movie') {
		console.log(parseDetailHtml('.btn-eps').length, '----- PUTLOCKER-CR BTN EPS----- ');
		parseDetailHtml('.btn-eps').each((keyDetail, itemDetail) => {
			let urlEmbed = parseDetailHtml(itemDetail).attr('data-file');
			console.log(urlEmbed, '------- PUTLOCKER-CR EMBEDS ----- ');
			if (urlEmbed) {
				embeds.push(urlEmbed);
			}
		})
	} else {
		console.log(parseDetailHtml('.btn-eps').length, '----- PUTLOCKER-CR BTN EPS----- ');
		parseDetailHtml('.btn-eps').each((keyDetail, itemDetail) => {
			let episode = parseDetailHtml(itemDetail).text();
			episode = episode.match(/episode *([0-9]+)/i)
			episode = episode ? episode[1] : 0
			let urlEmbed = parseDetailHtml(itemDetail).attr('data-file');

			console.log(episode, urlEmbed, '----- PUTLOCKER-CR EMBEDS----- ');
			if (urlEmbed && episode == movieInfo.episode) {
				embeds.push(urlEmbed);
			}
		})
	};

	let appMapEmbed = embeds.map(async (embed) => {
		const fileSize = await libs.request_getFileSize(embed)
		const host = libs.string_getHost(embed)

		console.log(embed, fileSize, host, "embed--------------------")
		if (!fileSize) {
		
			if (hosts[host]) {
				hosts[host](embed, movieInfo, _.merge(config, {provider: "PUTLOCKER-CR"}), callback)
			}
		} else {
			callback({
				file: embed,
				size: fileSize,
				host: host.toUpperCase(),
				provider: "PUTLOCKER-CR"
			})
		}
	});
	await Promise.all(appMapEmbed)
}