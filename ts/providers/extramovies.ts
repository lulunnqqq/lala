// @ts-nocheck

//http://extramovies.casa/


source.getResource =  async (movieInfo, config, callback) => {
	let url = `http://extramovies.shop/?s=${slugify(movieInfo.title, {lower: true, replacement: '+'})}`

	let html = await libs.request_get(url, {})
	let parse = cheerio.load(html)
	let link = ""

	console.log(parse(".imag").length, "--------------- EXTRAMOVIE SEARCH -----------")
	parse(".imag").each((key, item) => {
		let href = parse(item).find(".entry-title a").attr("href")
		let title = parse(item).find(".entry-title a").attr("title")
		let titleSlug = slugify(title, {lower: true, replacement: '-'})
		let movieTitleSlug = slugify(movieInfo.title, {lower: true, replacement: '-'})

		console.log(href, title, titleSlug, movieTitleSlug, "--------------- EXTRAMOVIE SEARCH INFO -----------")
		if (movieInfo.type == "movie") {

			console.log(titleSlug.indexOf(movieTitleSlug) != -1 ,titleSlug.indexOf(movieInfo.year) != -1, "--------------- EXTRAMOVIE SEARCH INFO MOVIES -----------")
			if (titleSlug.indexOf(movieTitleSlug) != -1 && titleSlug.indexOf(movieInfo.year) != -1) {
				link = href
			}
		}
		if (movieInfo.type == "tv") {
			let seasonE = `season-${movieInfo.season}-episode-${movieInfo.episode}`
			console.log(titleSlug.indexOf(movieTitleSlug) != -1, titleSlug.indexOf(seasonE) != -1, "--------------- EXTRAMOVIE SEARCH INFO TV -----------")
			if (titleSlug.indexOf(movieTitleSlug) != -1 && titleSlug.indexOf(seasonE) != -1) {
				link = href
			}
		}
	})

	console.log(link, "---------- EXTRAMOVIE LINK ----------")

	if (link != "") {
		let htmlDetail = await libs.request_get(link, {})
		let parseDetail = cheerio.load(htmlDetail)
		let sources = []

		console.log(parseDetail(".ttdbox").length, "---------- EXTRAMOVIE PARSE EMBED ----------")
		parseDetail(".ttdbox").each((keyDetail, itemDetail) => {

			parseDetail(itemDetail).find("a").each((keyA, itemA) => {
				let href = "http://extramovies.shop" + parseDetail(itemA).attr("href")
				if (href && href.indexOf("download.php") == -1) {
					sources.push(href)
				}
			})
			
			
		})

		console.log(sources, "---------- EXTRAMOVIE sources ----------")
		let arrMap = sources.map(async (embed) => {

			if (embed) {
				let htmlIframe = await libs.request_get(embed, {})
				let parseHtml = cheerio.load(htmlIframe)
				let iframe = parseHtml("iframe").attr("SRC") || parseHtml("iframe").attr("src")
				console.log(iframe, "iframe--------------------")
				if (iframe) {


					const fileSize = await libs.request_getFileSize(iframe)
					const host = libs.string_getHost(iframe)

					console.log(iframe, fileSize, host, "embed--------------------")
					if (fileSize == 0) {
						
						if (iframe.indexOf("mirrorace") != -1) {
							let userAgent = libs.request_getRandomUserAgent() 
							let headersMirror = {
								"user-agent": userAgent
							}
							let htmlMirrorace = await libs.request_get(iframe, headersMirror)
							let parseMirrorace = cheerio.load(htmlMirrorace)
							let sourceMirrorace = []
							console.log(parseMirrorace(".uk-active").length, "----- EXTRAMOVIE PARSE MIRROR --------")
							parseMirrorace(".play-video").each((keyMirror, itemMirror) => {
								let linkMirror = parseMirrorace(itemMirror).attr("data-link")
								let fileMirror = parseMirrorace(itemMirror).attr("data-file")
								let t = parseMirrorace(itemMirror).attr("data-t")
								sourceMirrorace.push({
									link: linkMirror,
									file: fileMirror,
									t: t
								})
							})
							console.log(sourceMirrorace, "----- EXTRAMOVIE SOURCE MIRROR --------")
							let arrMirror = sourceMirrorace.map(async (infoMirror) => {
								let urlGetLink = `https://mirrorace.com/ajax/embed_link`
								let body = `file=${infoMirror.file}&link=${infoMirror.link}&t=${infoMirror.t}`
								let resultMirror = await libs.request_post(urlGetLink, {
									"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
									"x-requested-with": "XMLHttpRequest",
									"user-agent": userAgent,
									"origin": "https://mirrorace.com"
								}, body, "json")
								console.log(resultMirror, body, "-------------- EXTRAMOVIE EMBED MIRROR --------")
								if (resultMirror.msg) {
									const hostMirror = libs.string_getHost(resultMirror.msg)
									if (hosts[hostMirror]) {
										hosts[hostMirror](resultMirror.msg, movieInfo, _.merge(config, {provider: "ExtraMovies"}), callback)
									}
								}
							})
							await Promise.all(arrMirror)
						} else {
							if (hosts[host]) {
								console.log(_.merge(config, {provider: "EXTRAMOVIE"}), "---------- config extra movies---------")
								hosts[host](iframe, movieInfo, _.merge(config, {provider: "ExtraMovies"}), callback)
							}
						}

						
					} else {
						callback({
							file: iframe,
							size: fileSize,
							host: host.toUpperCase(),
							provider: "ExtraMovies"
						})
					}
				}
			}
			
			
			
			
		})
		await Promise.all(arrMap)
	}
}
