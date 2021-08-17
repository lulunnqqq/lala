// @ts-nocheck

hosts["vidnext"] = async (url, movieInfo, config, callback)  => {


	let htmlVidcloud = await libs.request_get(url)
	let parseVidcloud = cheerio.load(htmlVidcloud)
	let sources = []

	console.log(parseVidcloud(".linkserver").length, "----------- vidnext SEARCH EMBED ----------")
	parseVidcloud(".linkserver").each((keyLink, itemLink) => {
		let embed = parseVidcloud(itemLink).attr("data-video")
		if (embed) {

			if (_.startsWith(embed, "/")) {
				embed = "https:" + embed;
			}
			sources.push(embed)
		}
	})

	console.log(sources, "----------- vidnext SOURCES EMBED ----------")
	let arrMap = sources.map(async (embed) => {
		const headerFile = await libs.request_head(file)	
		const fileSize =  headerFile["Content-Length"] || headerFile["content-length"];
		const typeFile = headerFile["x-goog-storage-class"] || "";
		const host = libs.string_getHost(embed)

		console.log(embed, fileSize, host, "vidnext embed--------------------")
		if (!fileSize || hosts[host]) {
		
			hosts[host](embed, movieInfo, config, callback)
		} else {
			callback({
				file: embed,
				size: fileSize,
				host: typeFile ? "Google Video" :host.toUpperCase(),
				provider: config.provider
			})
		}
	})
	await Promise.all(arrMap)


	let sources = htmlVidcloud.match(/sources *\: *([^\]]+)/im);
	sources = sources ? sources : [];

	for (let sourceItem = 1; sourceItem < sources.length; sourceItem++) {
		let source = sources[sourceItem] ? sources[sourceItem] + "]" : "[]"
		let parse = []
		source = `parse = ${source}`
		eval(source)


		console.log(parse, "------------ SOURCES vidnext -------------")
		let length = parse.length;
		for (let i = 0; i < length; i++) {
			const file = parse[i].file;

			console.log(parse[i], "------------ SOURCE DETAIL vidnext -------------")

			const headerFile = await libs.request_head(file)	
			const fileSize =  headerFile["Content-Length"] || headerFile["content-length"];
			const typeFile = headerFile["x-goog-storage-class"] || "";
			if (fileSize > 0) {
				callback({
					file: file,
					size: fileSize,
					host: typeFile ? "Google Video" : "Vidnext" + `${parse[i].type == 'hls' ? ' Hls' : ''}`,
					provider: config.provider,
				})
			}	
		}
	}

}