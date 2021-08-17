// @ts-nocheck

hosts["vid215"] = async (url, movieInfo, config, callback)  => {

	const html = await libs.request_get(url, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "html")
	let source = html.match(/sources *\: *([^\]]+)/i);
	source = source ? source[1] + "]" : "[]"
	let parse = []
	source = `parse = ${source}`
	eval(source)

	console.log(parse, "------------ SOURCES VID215 -------------")
	let length = parse.length;
	for (let i = 0; i < length; i++) {
		const file = parse[i].src;
		console.log(parse[i], "------------ SOURCE DETAIL VID215 -------------")
		const fileSize = await libs.request_getFileSize(file)	
		if (fileSize > 0) {
			callback({
				file: file,
				size: fileSize,
				host: "VidStream",
				provider: config.provider
			})
		}	
	}
}