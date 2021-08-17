// @ts-nocheck

hosts["vidcloud.msk"] = async (url, movieInfo, config, callback)  => {

	const html = await libs.request_get(url, {
		"user-agent": libs.request_getRandomUserAgent()
	}, "html")
	let source = html.match(/sources *\: *([^\]]+)/i);
	source = source ? source[1] + "]" : "[]"
	source = JSON.parse(source)

	for (const item of source) {	
		callback({
			file: item.file,
			host: "Vidcloud",
			provider: config.provider,
			quality: item.type
		})
	}
}