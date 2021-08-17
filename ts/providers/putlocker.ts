// @ts-nocheck



source.getResource =  async (movieInfo, config, callback) => {

	const domain = `https://ww4.putlocker.vip`
	const urlSearch = `${domain}/movie/search/${slugify(movieInfo.title, {lower: true, replacement: '+'})}`;

	console.log(urlSearch, `-------- PUTLOCKER URLSEARCH ---------`);
	const htmlSearch = await libs.request_get(urlSearch);
	const parseSearch = cheerio.load(htmlSearch);

	let link = "";

	console.log(parseSearch(".ml-item").length, `-------------- PUTLOCKER LENGTH SEARCH -----------`);
	parseSearch(".ml-item").each((keyItem, valueItem) => {
		let title = parseSearch(valueItem).find(".mli-info h2").text();
		let href = parseSearch(valueItem).find(".ml-mask").attr("href");
		let season = title.match(/ *\- *season *([0-9]+)/i);
		season = season ? season[1] : 0;
		title = title.toLowerCase().replace(/ *\- *season *[0-9]+/i, '');
		title = title.trim();

		console.log(title, href, season, `-------------- PUTLOCKER INFO -----------`);

		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie" && season == 0) {
				link = href;
			} else if (movieInfo.type == "tv" && season == movieInfo.season) {
				link = href;
			}
		}
	});

	console.log(link, `-------------- PUTLOCKER LINK -----------`);
	if (link) {

		let sourceId = link.match(/\-([0-9]+)\//i);
		sourceId = sourceId ? sourceId[1] : 0;

		console.log(sourceId, `-------------- PUTLOCKER SOURCE ID -----------`);
		if (sourceId == 0) {
			return;
		}
		let ajaxMovieEpisode = `${domain}/ajax/movie_episodes/${sourceId}`;
		let responseAjaxMovie = await libs.request_get(ajaxMovieEpisode, {}, 'json');

		console.log(responseAjaxMovie, `-------------- PUTLOCKER responseAjaxMovie -----------`);
		if (responseAjaxMovie.status == 0) {
			return;
		}
		const parseAjaxMovie = cheerio.load(responseAjaxMovie.html);

		let ids = [];

		console.log(parseAjaxMovie(".ep-item").length, `-------------- PUTLOCKER Parse Ajax -----------`);
		parseAjaxMovie(".ep-item").each((keyItem, valueItem) => {
			let episodeId = parseAjaxMovie(valueItem).attr("data-id");

			console.log(episodeId, `-------------- PUTLOCKER Episode Id -----------`);
			if (movieInfo.type == "movie") {
				if (episodeId) {
					ids.push(episodeId);
				}
				
			} else {
				let titleEpisode = parseAjaxMovie(valueItem).text();
				titleEpisode = titleEpisode.toLowerCase().match(/episode *([0-9]+)/i);
				let episode = titleEpisode ? titleEpisode[1] : 0;
				console.log(titleEpisode, episode, `-------------- PUTLOCKER episode -----------`);

				if (movieInfo.episode == episode) {
					ids.push(episodeId);
				}
			}
			
		});

		console.log(ids, `-------------- PUTLOCKER ids -----------`);
		let arrMap = await ids.map(async (id) => {
			let urlEmbed = `${domain}/ajax/movie_embed/${id}`;

			console.log(urlEmbed, '------- PUTLOCKER URL EMBED -------');
			let responseEmbed = await libs.request_get(urlEmbed, {}, 'json');

			console.log(responseEmbed, `------------ PUTLOCKER responseEmbed -------`);
			if (responseEmbed.status) {

				const hostEmbed = libs.string_getHost(responseEmbed.src);
				if (hosts[hostEmbed]) {
					hosts[hostEmbed](embed, movieInfo, _.merge(config, {provider: "PUTLOCKER"}), callback);
				}

				let htmlEmbed = await libs.request_get(responseEmbed.src, {
					"Referer": domain
				});

				let source = htmlEmbed.match(/sources *\: *([^\]]+)/i);
				source = source ? source[1] + "]" : "[]"
				let parse = [];
				source = `parse = ${source}`

				eval(source);

				console.log(parse, 'parse');

				for (let i = 0; i < parse.length; i++) {
					const embed = parse[i].file;

					console.log(parse[i], "------------ SOURCE DETAIL PUTLOCKER -------------")

					const fileSize = await libs.request_getFileSize(embed)	
					const host = libs.string_getHost(embed)
					if (fileSize > 0) {
						callback({
							file: embed,
							size: fileSize,
							host: host,
							provider: 'Putlocker',
							quality: parse[i].label,
						})
					} else {
						if (hosts[host]) {
							hosts[host](embed, movieInfo, _.merge(config, {provider: "Putlocker"}), callback)
						}
					}
				}
			}
			
		});
		await Promise.all(arrMap);
	}
}