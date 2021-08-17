// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {

	const url = `https://simplestream.in/api/search`;
	const body = JSON.stringify({
		query: movieInfo.title
	});
	const headers = {
		"content-type": "application/json",
		referer: `https://simplestream.in/search/title/${movieInfo.title}`
	}
	const results = await libs.request_put(url, headers, body, 'json');

	console.log(results, url, headers, body, "---------------- SIMPLESTREAM SEARCH INFO -------")
	let linkId = "";
	const searchMovies = results.Movies ? results.Movies : [];
	const searchTv = results.TV ? results.TV : [];

	console.log(searchMovies.length, searchTv.length, "---------------- SIMPLESTREAM SEARCH LENGTH RESULT")
	if (movieInfo.type == "movie") {
		for (let item of searchMovies) {

			console.log(item.Title, movieInfo.title, movieInfo.year, item.Year, slugify(movieInfo.title, {lower: true}), slugify(item.Title.trim(), {lower: true}), "---------------- SIMPLESTREAM MOVIE INFO")
			if (slugify(movieInfo.title, {lower: true}) == slugify(item.Title.trim(), {lower: true})) {
				if (movieInfo.year == item.Year) {
					linkId = item.IMDB;
					break;
				}
			}
		}
	} else {
		for (let item of searchTv) {
			const titleTv = item.Title.replace(/\( *[0-9]+ *\)/i, "").trim();

			console.log(titleTv, item.Year, "---------------- SIMPLESTREAM TV INFO")
			if (slugify(movieInfo.title, {lower: true}) == slugify(item.Title.trim(), {lower: true})) {
				linkId = item.IMDB;
				break;
			}
		}
	}

	console.log(linkId, "---------------- SIMPLESTREAM LINK ID -------")
	if (linkId) {
		let link = "";
		if (movieInfo.type == "tv") {
			link = `https://simplestream.in/api/releases/tv/${linkId}/${movieInfo.season}0000${movieInfo.episode}`
		} else {
			link = `https://simplestream.in/api/releases/movie/${linkId}`
		}

		let embeds = await libs.request_get(link, {}, 'json');

		console.log(embeds, "----------------- SIMPLESTREAM EMBEDS");
		embeds = embeds ? embeds : [];

		let arrMap = embeds.map(async (itemEmbed) => {
			let embed = itemEmbed.Link;
			if (embed) {
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (!fileSize) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "SimpleStream"}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "SimpleStream"
					})
				}
			}
		});
		await Promise.all(arrMap);
	}
}
