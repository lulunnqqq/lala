// @ts-nocheck




source.getResource =  async (movieInfo, config, callback) => {
	let urlSearch = "";
	let urlAjax = `https://123moviesfull.name/wp-admin/motherfucker.php`
	if (movieInfo.type == "movie") {
	let endpoint = movieInfo.title.trim() + ` ${movieInfo.year}`
		urlSearch = `https://123moviesfull.name/film/${slugify(endpoint, {lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g})}/`
	} else {
		let endpoint = movieInfo.title.trim() + ` season ${movieInfo.season}`
		urlSearch = `https://123moviesfull.name/tvshow/${slugify(endpoint, {lower: true, replacement: '-', remove: /[*+~.()'"!:@]/g})}/`
	}

	console.log(urlSearch, "----------- 123MOVIESFULL URLSEARCH -----------")

	let headers = {}
	let htmlDetail = await libs.request_get(urlSearch, headers)
	let parseDetail = cheerio.load(htmlDetail)
	let link = parseDetail(".thumb.mvi-cover").attr("href")

	console.log(link, "----------- 123MOVIESFULL Link -----------")

	if (link) {
		let htmlTv = await libs.request_get(link)
		let parseTv = cheerio.load(htmlTv)
		
		if (movieInfo.type == "movie") {
			let idsEpisode = [];

			console.log(parseTv(".btn-eps.first-ep.last-ep").length, "----------- 123MOVIESFULL SEARCH ITEM -----------")
			parseTv(".btn-eps.first-ep.last-ep").each((keyTv, itemTv) => {

				let onClickData = parseTv(itemTv).attr("onclick")
				let matchEpisode = onClickData.match(/load_movie_iframe2\( *([0-9]+)/i)
				let e = matchEpisode ? matchEpisode[1] : 0;
				let id = parseTv(itemTv).attr("episode-id")
				idsEpisode.push({
					id,
					e
				})
				
			})

			console.log(idsEpisode, "----------- 123MOVIESFULL ID EPISODE -----------")

			let arrMap = idsEpisode.map(async (item) => {
				if (item.e == 3) {
					
					let headersBody = {
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
					let body = `action=fkingyrfather&id=${item.id}&annoying=videospider`
					// let body = qs.stringify({
					// 	action: "fkingyrfatherep",
					// 	id: item.id,
					// 	annoying: "videospider"
					// })
					let result = await libs.request_post(urlAjax, headersBody, body, "json")
					console.log(result, body, "----------- 123MOVIESFULL URL HTML -----------")
					if (result.status == 1) {
						let url = result.url;
						console.log(result, body, "----------- 123MOVIESFULL URL OLOAD -----------")
						await libs.request_parseOload(url, movieInfo, _.merge(config, {provider: "123MoviesFull"}), callback)
					}
				}
				
			})
			await Promise.all(arrMap)
		}
		if (movieInfo.type == "tv") {
			let idsEpisode = [];

			console.log(parseTv(".btn-eps.first-ep.last-ep").length, "----------- 123MOVIESFULL SEARCH TV -----------")
			parseTv(".btn-eps.first-ep.last-ep").each((keyTv, itemTv) => {
				let titleEpisode = parseTv(itemTv).text();
				let episode = titleEpisode.toLowerCase().match(/episode *([0-9]+)/i)
				episode = episode ? episode[1] : 0;

				console.log(episode, movieInfo.episode, "----------- 123MOVIESFULL MAPPING EPISODE -----------")
				if (episode == movieInfo.episode) {
					let onClickData = parseTv(itemTv).attr("onclick")
					let matchEpisode = onClickData.match(/load_episode_iframe2\( *([0-9]+) *\, *([0-9]+)/i)
					let id = matchEpisode ? matchEpisode[1] : 0;
					let e = matchEpisode ? matchEpisode[2] : 0
					let idEmbed = parseTv(itemTv).attr("data-very")
					idsEpisode.push({
						id,
						e,
						idEmbed
					})
				}
			})

			console.log(idsEpisode, "----------- 123MOVIESFULL ID EPISODE TV -----------")
			let arrMap = idsEpisode.map(async (item) => {
				if (item.e == 123) {
					let headersBody = {
						"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
					}
					let body = `action=fkingyrfatherep&id=${item.id}&annoying=videospider`
					let result = await libs.request_post(urlAjax, headersBody, body, "json")
					console.log(result, body, "----------- MOVIESFULLHD TV SPIDER ---------")
					if (result.status == 1) {
						let url = result.url;
						await libs.request_parseOload(url, movieInfo, _.merge(config, {provider: "123MoviesFull"}), callback)
					}
				}
				// if (item.e == 3) {
				// 	let urlEmbed = `https://vidoo.streamango.to/e/${item.idEmbed}`	
				// 	const host = libs.string_getHost(urlEmbed)
				// 	if (hosts[host]) {
				// 		hosts[host](urlEmbed, movieInfo, _.merge(config, {provider: "MOVIESFULLHD"}), callback)
				// 	}
				// }
				// if (item.e == 8) {
				// 	let urlEmbed = `https://play.streamango.to/${item.idEmbed}`	
				// 	const host = libs.string_getHost(urlEmbed)
				// 	if (hosts[host]) {
				// 		hosts[host](urlEmbed, movieInfo, _.merge(config, {provider: "MOVIESFULLHD"}), callback)
				// 	}
				// }
			})
			await Promise.all(arrMap)
		}

		
	}

	
}
