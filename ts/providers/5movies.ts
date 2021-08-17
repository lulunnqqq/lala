// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	const domain = `https://5movies.cloud`;
	let urlSearch = `${domain}/movie/search/${slugify(movieInfo.title, {lower: true, replacement: '+'})}`
	let htmlSearch  = await libs.request_get(urlSearch)
	let parseSearch = cheerio.load(htmlSearch)

	let link = ""

	console.log(parseSearch(".ml-item").length, "-------- 5MOVIES SEARCH INFO -------")
	parseSearch(".ml-item").each((keySearch, itemSearch) => {
		let title = parseSearch(itemSearch).find(".mli-info h2").text()
		title = title.replace(/\( *[0-9]+ *\)/i, '').trim();
		let season = title.toLowerCase().match(/\- *season *([0-9]+)/i)
		season = season ? season[1] : 0
		title = title.toLowerCase().replace(/\- *season [0-9]+/i, "").trim()
		let href = parseSearch(itemSearch).find(".ml-mask").attr("href")


		console.log(title, season, href, "-------- 5MOVIES DETAIL INFO -------")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			if (movieInfo.type == "movie") {
				link = href
			}

			if (movieInfo.type == "tv" && season == movieInfo.season) {
				link = href
			}
		}
	})

	console.log(link, "-------- 5MOVIES DETAIL INFO -------")
	if (!link) {
		return
	}
	link = `${domain}${link}`;
	let token = link.match(/\-([0-9]+)\/$/i);
	token = token ? token[1] : 0;


	console.log(token, "-------- 5MOVIES TOKEN -------")
	if (!token) {
		return;
	}



	const urlDetail = `${domain}/ajax/movie_episodes/${token}`;
	let responseDetail = await libs.request_get(urlDetail, {}, 'json');

	console.log(urlDetail, responseDetail, "-------- 5MOVIES DETAIL -------")
	if (responseDetail.status != 1 || !responseDetail.html) {
		return;
	}

	const parseDetail = cheerio.load(responseDetail.html);

	let tokenIds = [];
	if (movieInfo.type == 'movie') {
		parseDetail('a.btn-eps').each((keyDetail, itemDetail) => {
			const id = parseDetail(itemDetail).attr('data-id');
			if (id) {
				tokenIds.push(id);
			}
		})
	} else {
		parseDetail('a.btn-eps').each((keyDetail, itemDetail) => {
			let episode = parseDetail(itemDetail).text();
			episode = episode.match(/episode *([0-9]+)/i)
			episode = episode ? episode[1] : 0;
			const id = parseDetail(itemDetail).attr('data-id');


			console.log(episode, id, "-------- 5MOVIES TOKEN EPISODE ID -------")
			if (id && episode == movieInfo.episode) {
				tokenIds.push(id);
			}
		})
	}

	console.log(tokenIds, "-------- 5MOVIES TOKEN IDS -------")

	let embeds = [];
	let arrMap = tokenIds.map(async (id) => {
		let urlEmbed = `${domain}/ajax/movie_embed/${id}`;
		let resultEmbed = await libs.request_get(urlEmbed, {}, 'json');

		console.log(urlEmbed, resultEmbed, "-------- 5MOVIES REQUEST EMBED -------")
		if (resultEmbed.status && resultEmbed.src) {
			embeds.push(resultEmbed.src);
		}
	});
	await Promise.all(arrMap);

	console.log(embeds, "-------- 5MOVIES EMBEDS -------")

	let arrHost = embeds.map(async (urlHost) => {
		const fileSize = await libs.request_getFileSize(urlHost)
		const host = libs.string_getHost(urlHost)

		console.log(urlHost, fileSize, host, "embed.u--------------------")

		if (host.indexOf('stream365') != -1) {
			let html = await libs.request_get(urlHost, {
				Referer: domain
			}, "html");
		
			let source = html.match(/sources *\: *([^\]]+)/i);
			source = source ? source[1] + "]" : "[]"
			let parse = []
			source = `parse = ${source}`
			eval(source)
		
			console.log(parse, urlHost, "------------ SOURCES STREAM 5MOVIES -------------")
			let length = parse.length;
			for (let i = 0; i < length; i++) {
				const file = parse[i].file;
				const quality = parse[i].label;
		
				
		


				console.log(parse[i], "------------ SOURCE DETAIL STREAM 5MOVIES -------------")

					callback({
						file: file,
						host:  'Stream365',
						provider: "5Movies",
						quality,
					})
			}
		}

		if (fileSize == 0) {
				
			if (hosts[host]) {
				hosts[host](urlHost, movieInfo, _.merge(config, {provider: "5Movies", urlDetail: link}), callback)
			}
		} else {
			callback({
				file: urlHost,
				size: fileSize,
				host: host.toUpperCase(),
				provider: "5Movies"
			})
		}	
	});
	await Promise.all(arrHost);
}
