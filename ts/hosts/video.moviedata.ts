// @ts-nocheck

hosts["video.moviedata"] = async (url, movieInfo, config, callback)  => {

	let urlEmbed = url.replace("https://video.moviedata.xyz/embed/player.html", "https://video.moviedata.xyz/api")
	const result = await libs.request_get(urlEmbed, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "json")

	console.log(urlEmbed, result, "---------------- RESULT VIDEO MOVIE DATA --------")
	let arrMap = result.map(async (item) => {
		try {
			let embed = item.link;
			
			if (embed) {
				if (_.startsWith(embed, "//")) {
					embed = "https:" + embed;
				}

				console.log(embed, fileSize, host, "embed video moviedata --------------------")
				const fileSize = await libs.request_getFileSize(embed)
				const host = libs.string_getHost(embed)

				
				if (!fileSize) {
				
					if (hosts[host]) {
						hosts[host](embed, movieInfo, _.merge(config, {provider: config.provider}), callback)
					}
				} else {
					callback({
						file: embed,
						size: fileSize,
						host: host.toUpperCase(),
						provider: config.provider
					})
				}
			}
		} catch(e) {}
		
	})
	await Promise.all(arrMap)
}