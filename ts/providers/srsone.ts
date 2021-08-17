// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	function dbneg2(X) {
		var Y = {}
		Y["GLXpa"] = function(Z, a0) {
			return Z - a0;	
		}
		var a1 = 6946588830;
		var a2 = "";
		var a3 = X.split('-');
		for (i = 0x0; i < a3.length; i++) {
	        xh = Y["GLXpa"](parseInt(a3[i], 16), a1);
	        var a4 = String.fromCharCode(xh);
	        var a2 = a2 + a4;
	    }
	    return a2;
	}
	if (movieInfo.type == "movie") {
		return;
	}
	let url = `https://srsone.top/ajax/search.php`
	let body = {
		q: movieInfo.title,
		limit: 20,
		timestamp: Date.now(),
		verifiedCheck: ""
	}
	let resultSearch = await libs.request_post(url, {
		"content-type": "application/x-www-form-urlencoded"
	}, qs.stringify(body), "json")

	console.log(resultSearch, url, body, "---------- SRSONE RESULT SEARCH -------")
	resultSearch = resultSearch ? resultSearch : []

	

	let link = ""

	let arrMap = resultSearch.map(async (item) => {
		let title = item.title.replace(/\( *[0-9]+.*/i, "").trim()

		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			link = item.permalink;
		}
	})
	await Promise.all(arrMap)

	console.log(link, "---------- SRSONE LINK -------")
	if (link != "") {
		let linkWatch = `${link}/season/${movieInfo.season}`

		console.log(linkWatch, "----------- SRSONE LINK WATCH ---------")
		let htmlEpisode = await libs.request_get(linkWatch)
		let parseEpisode = cheerio.load(htmlEpisode)

		let linkEpisode = "";

		console.log(parseEpisode(".hgrid").length, "--------- SRSONE EPISODE LENGTH ----------")
		parseEpisode(".hgrid").each((keyEpisode, itemEpisode) => {
			let hrefEpisode = parseEpisode(itemEpisode).find(".watch_now").attr("href")
			let titleEpisode = parseEpisode(itemEpisode).find(".episode").text();
			let episode = titleEpisode.toLowerCase().match(/ep *\.* *([0-9]+)/i)
			episode = episode ? episode[1] : 0;

			console.log(titleEpisode, episode, hrefEpisode, "---------- SRSONE EPISODE DETAIL ----------")
			if (episode == movieInfo.episode) {
				linkEpisode = hrefEpisode;
			}
		})

		console.log(linkEpisode, "----------- SRSONE LINK EPISODE  ---------")
		if (linkEpisode != "") {
			
			let htmlDetail = await libs.request_get(linkEpisode)
			let parseDetail = cheerio.load(htmlDetail)

			let tokens = [];

			console.log(parseDetail("#listlink .embed-selector").length, "---------- SRSONE TOKEN LENGTH -------")
			parseDetail("#listlink .embed-selector").each((keyToken, itemToken) => {
				let token = parseDetail(itemToken).attr("onclick") || parseDetail(itemToken).attr("onClick");
				token = token.match(/window\.open\( *dbneg\( *\'([^\']+)/i)
				token = token ? token[1] : '';

				if (token) {
					tokens.push(token);
				}
			})

			console.log(tokens, "---------- SRSONE TOKEN -------")
			let arrMap = tokens.map(async (item) => {
				let embed = dbneg2(item)
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				console.log(embed, fileSize, host, "embed--------------------")
				if (fileSize == 0) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "SoneMovie"}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: "SoneMovie"
					})
				}
			})
			await Promise.all(arrMap)
		}

	}
}
