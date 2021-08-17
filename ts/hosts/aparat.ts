// @ts-nocheck

hosts["aparat"] = async (url, movieInfo, config, callback)  => {

	console.log(url, "--------- APARAT URL -----------");

	let html = await libs.request_get(url, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "html");

	let source = html.match(/sources *\: *([^\]]+)/i);
	source = source ? source[1] + "]" : "[]"
	let parse = []
	source = `parse = ${source}`
	eval(source)

	console.log(parse, "------------ SOURCES APARAT -------------")
	let length = parse.length;
	for (let i = 0; i < length; i++) {
		const file = parse[i].src;

		console.log(parse[i], "------------ SOURCE DETAIL APARAT -------------")

		// const fileSize = await libs.request_getFileSize(file)	
		// if (fileSize > 0) {
			callback({
				file: file,
				quality: 'HLS',
				host: "Aparat",
				provider: config.provider
			})
		// }	
	}


}