// @ts-nocheck


source.getResource = async (movieInfo, config, callback) => {

	if (movieInfo.type == "movie") {return;}

	// var CryptoJSAesJson = {
 //        stringify: function (cipherParams) {
 //            var j = {ct: cipherParams.ciphertext.toString(crypto.enc.Base64)};

 //            if (cipherParams.iv) j.iv = cipherParams.iv.toString();
 //            if (cipherParams.salt) j.s = cipherParams.salt.toString();
 //            return JSON.stringify(j);
 //        },
 //        parse: function (jsonStr) {
 //            var j = JSON.parse(jsonStr);
 //            var cipherParams = crypto.lib.CipherParams.create({ciphertext: crypto.enc.Base64.parse(j.ct)});
 //            if (j.iv) cipherParams.iv = crypto.enc.Hex.parse(j.iv)
 //            if (j.s) cipherParams.salt = crypto.enc.Hex.parse(j.s)
 //            return cipherParams;
 //        }
 //    }
    let secretKey = "HhajkHHGbxbhjHGkjal866aOo16Abxp"
    var CryptoJSAesJson = {
        stringify: function(_0x323ex23) {
            var _0x323ex11 = {
                ct: _0x323ex23.ciphertext.toString(crypto.enc.Base64)
            };
            if (_0x323ex23.iv) {
                _0x323ex11.iv = _0x323ex23.iv.toString()
            };
            if (_0x323ex23.salt) {
                _0x323ex11.s = _0x323ex23.salt.toString()
            };
            return JSON.stringify(_0x323ex11).replace(/\s/g, "")
        },
        parse: function(_0x323ex24) {
            var _0x323ex10 = [40, 30, 20, 5, 2, 0];
            for (var _0x323ex25 = 0; _0x323ex25 < _0x323ex10.length; _0x323ex25++) {
                _0x323ex24 = _0x323ex24.slice(0, _0x323ex10[_0x323ex25]) + _0x323ex24.slice(_0x323ex10[_0x323ex25] + 1)
            };
            _0x323ex24 = libs.string_atob(_0x323ex24);
            var _0x323ex11 = JSON.parse(_0x323ex24);
            var _0x323ex23 = crypto.lib.CipherParams.create({
                ciphertext: crypto.enc.Base64.parse(_0x323ex11.ct)
            });
            if (_0x323ex11.iv) {
                _0x323ex23.iv = crypto.enc.Hex.parse(_0x323ex11.iv)
            };
            if (_0x323ex11.s) {
                _0x323ex23.salt = crypto.enc.Hex.parse(_0x323ex11.s)
            };
            return _0x323ex23
        }
    };
    

	let headers = {
		referer: "https://www1.watch-series.la/"
	}

	let urlSearch = `https://www1.watch-series.la/search/${slugify(movieInfo.title, {lower: true, replacement: "-", remove: /[*+~.()'"!:@]/g})}`
	// urlSearch = urlSearch.replace("-", "%20")
	let htmlSearch = await libs.request_get(urlSearch, headers)
	let parseSearch = cheerio.load(htmlSearch)

	let link = ""

	console.log(parseSearch(".search-item").length, urlSearch, "--------- WATCHSERIES SEARCH LENGTH")
	parseSearch(".search-item").each((keySearch, itemSearch) => {
		let href = parseSearch(itemSearch).find("div[valign=top] a").first().attr("href")
		let title = parseSearch(itemSearch).find("div[valign=top] a").first().find("strong").text()
		title = title.replace(/\( *[0-9]+ *\)/i, "").trim()

		console.log(href, title, "--------- WATCHSERIES SEARCH INFO")
		if (slugify(movieInfo.title, {lower: true}) == slugify(title.trim(), {lower: true})) {
			link = href;
		}	

	})

	console.log(link, "--------- WATCHSERIES LINK")
	if (link != "") {
		let htmlDetail = await libs.request_get(link, headers)
		let parseDetail = cheerio.load(htmlDetail)

		let linkEpisode = ""

		console.log(parseDetail("div[itemprop=season]").length, "--------- WATCHSERIES LENGTH DETAIL")
		parseDetail("div[itemprop=season]").each((keySeason, itemSeason) => {
			let season = parseDetail(itemSeason).find("span[itemprop=name]").text()
			console.log(season, movieInfo.season, "--------- WATCHSERIES SEARCH SEASON")
			season = season.toLowerCase().match(/season *([0-9]+)/i)
			season = season ? season[1] : 0

			
			if (season == movieInfo.season) {

				console.log(parseDetail(itemSeason).find("li[itemprop=episode]").length, "--------- WATCHSERIES EPISODE LENGTH")
				parseDetail(itemSeason).find("li[itemprop=episode]").each((keyEpisode, itemEpisode) => {
					let episode = parseDetail(itemEpisode).find("meta[itemprop=episodenumber]").attr("content");
					let hrefEpisode = parseDetail(itemEpisode).find("meta[itemprop=url]").attr('content')

					if (episode == movieInfo.episode) {
						linkEpisode = hrefEpisode
					}
				})
			}
		})

		console.log(linkEpisode, "--------- WATCHSERIES LINK EPISODE")
		if (linkEpisode != "") {
			let htmlEpisode = await libs.request_get(linkEpisode, headers)
			let parseEpisode = cheerio.load(htmlEpisode)

			console.log(parseEpisode(".watchlink").length, "--------- WATCHSERIES WATCH LINK")
			let sources = []
			parseEpisode(".watchlink").each((keyEpisode, itemEpisode) => {
				if (sources.length <= 150) {
					let href = parseEpisode(itemEpisode).attr("href")
					if (href) {
						sources.push(href)
					}
				}
			})

			console.log(sources, "--------- WATCHSERIES SOURCES")
			let arrMap = sources.map(async (href) => {
				let token = href.match(/r\=(.*)/i)
				token = token ? token[1] : ""

				if (token) {

					let embed = JSON.parse(crypto.AES.decrypt(token, secretKey, {format: CryptoJSAesJson}).toString(crypto.enc.Utf8))
					console.log(token, embed, "--------- WATCHSERIES TOKEN")

					const host = libs.string_getHost(embed)

					console.log(embed, host, "embed--------------------")
					
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: "WatchSeries"}), callback)
					}
					
				}
			})
			await Promise.all(arrMap)
		}
	}
}
