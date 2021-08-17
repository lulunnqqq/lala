// @ts-nocheck

hosts["vidnode"] = async (url, movieInfo, config, callback)  => {


	let htmlVidcloud = await libs.request_get(url)
	let parseVidcloud = cheerio.load(htmlVidcloud)
	


	let source = htmlVidcloud.match(/sources *\: *([^\]]+)/i);
	source = source ? source[1] + "]" : "[]"
	let parse = []
	source = `parse = ${source}`
	eval(source)

	console.log(parse, "------------ SOURCES VIDNODE -------------")
	let length = parse.length;
	for (let i = 0; i < length; i++) {
		const file = parse[i].file;

		console.log(parse[i], "------------ SOURCE DETAIL VIDNODE -------------")

		const headerFile = await libs.request_head(file)	
		const fileSize =  headerFile["Content-Length"] || headerFile["content-length"];
		const typeFile = headerFile["x-goog-storage-class"] || "";
		if (fileSize > 0) {
			callback({
				file: file,
				size: fileSize,
				host: typeFile ? "Google Video" : "Vidnode",
				provider: config.provider
			})
		}	
	}

	console.log(parseVidcloud(".linkserver").length, "----------- VIDNODE SEARCH EMBED ----------");

	let sourcesEmbed = []
	parseVidcloud(".linkserver").each((keyLink, itemLink) => {
		let embed = parseVidcloud(itemLink).attr("data-video")
		if (_.startsWith(embed, '/')) {
			embed = `https:${embed}`;
		}
		if (embed) {
			sourcesEmbed.push(embed)
		}
	})

	console.log(sourcesEmbed, "----------- VIDNODE SOURCES EMBED ----------")
	let arrMap = sourcesEmbed.map(async (embed) => {
		const host = libs.string_getHost(embed)
		const headerFile = await libs.request_head(file)	
		const fileSize =  headerFile["Content-Length"] || headerFile["content-length"];
		const typeFile = headerFile["x-goog-storage-class"] || "";

		console.log(embed, fileSize, host, "vidnode embed--------------------")
		if (!fileSize || hosts[host]) {
		
			hosts[host](embed, movieInfo, config, callback)
		} else if (fileSize > 0 && !hosts[host]) {
			callback({
				file: embed,
				size: fileSize,
				host: typeFile ? "Google Video" : host.toUpperCase(),
				provider: config.provider
			})
		}
	})
	await Promise.all(arrMap)

	console.log(parseVidcloud(".linkserver").length, "----------- VIDNODE SEARCH EMBED ----------")
	parseVidcloud(".linkserver").each((keyLink, itemLink) => {
		let embed = parseVidcloud(itemLink).attr("data-video")
		if (embed && embed.indexOf("vidcloud9") == -1) {
			sourcesEmbed.push(embed)
		}
	})

	console.log(sourcesEmbed, "----------- VIDNODE SOURCES EMBED ----------")
	let arrMap = sourcesEmbed.map(async (embed) => {
		const fileSize = await libs.request_getFileSize(embed)
		const host = libs.string_getHost(embed)

		
		if (!fileSize || hosts[host]) {
		

			console.log(embed, fileSize, host, "embed vidnode--------------------")
			hosts[host](embed, movieInfo, config, callback)
		} else if (fileSize > 0 && !hosts[host])  {
			callback({
				file: embed,
				size: fileSize,
				host: host.toUpperCase(),
				provider: config.provider
			})
		}
	})
	await Promise.all(arrMap)
}